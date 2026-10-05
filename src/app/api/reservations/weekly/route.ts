import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { DateTime } from "luxon";
import { prisma } from "@/db/prisma";

export const dynamic = "force-dynamic";

const ZONE = "Europe/Prague";

/**
 * The payload carries names, emails and phone numbers, so the route is never
 * open: without RESERVATIONS_API_KEY configured it refuses to answer at all
 * rather than falling back to serving personal data to anyone who finds it.
 */
const isAuthorized = (req: NextRequest): boolean => {
  const expected = process.env.RESERVATIONS_API_KEY;
  if (!expected) return false;

  const provided =
    req.headers.get("x-api-key") ??
    req.headers.get("authorization")?.replace(/^Bearer /i, "") ??
    "";

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};

/**
 * Resolves the Monday–Sunday week to return.
 *
 * `?week=YYYY-MM-DD` picks the week containing that day; without it the week
 * containing today in Europe/Prague is used.
 */
const resolveWeek = (week: string | null) => {
  const base = week
    ? DateTime.fromISO(week, { zone: ZONE })
    : DateTime.now().setZone(ZONE);

  if (!base.isValid) return null;

  return { start: base.startOf("week"), end: base.endOf("week") };
};

/**
 * A per-IP request ceiling.
 *
 * The key itself is unguessable, so this is not brute-force protection — it is
 * a cap on how fast a *leaked* key can be used to harvest the season. The real
 * caller makes about one request a minute, so the ceiling never shows up in
 * normal use.
 *
 * Deliberately per-IP rather than global: a single shared counter would let
 * anyone flood the route and lock the legitimate caller out.
 *
 * Caveat: the window lives in the instance's memory. Vercel runs several
 * instances, so the effective limit is this number times the instance count,
 * and it resets on every cold start. That is fine for a speed bump; a hard
 * guarantee would need shared storage (Vercel KV / Upstash).
 */
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60_000;

const hits = new Map<string, { count: number; resetAt: number }>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const current = hits.get(ip);

  if (!current || current.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });

    // Sweep here rather than on a timer: expired entries are only dead weight,
    // and this is the one place we already know the clock has moved.
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }

    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT;
};

/** Vercel sets `x-forwarded-for`; the client address is the first entry. */
const clientIp = (req: NextRequest): string =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

export async function GET(req: NextRequest) {
  if (!process.env.RESERVATIONS_API_KEY) {
    return NextResponse.json(
      { error: "API is not configured." },
      { status: 503 },
    );
  }

  // Checked before the key, so failed attempts are capped too.
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const week = resolveWeek(req.nextUrl.searchParams.get("week"));

  if (!week) {
    return NextResponse.json(
      { error: "Invalid 'week' parameter, expected YYYY-MM-DD." },
      { status: 400 },
    );
  }

  const { start, end } = week;

  // The feed only ever hands out today and what is still ahead. Without this
  // floor the `week` parameter is a walk back through every past week, which
  // turns one leaked key into the whole season's customer list rather than a
  // few days of upcoming appointments. The floor is the start of today, so
  // today's appointments stay in even after they have finished.
  const floor = DateTime.now().setZone(ZONE).startOf("day");

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        startDate: {
          gte: start.toUTC().toJSDate(),
          lte: end.toUTC().toJSDate(),
        },
        endDate: { gte: floor.toUTC().toJSDate() },
      },
      // Only the columns the rental app actually displays. Selecting rather than
      // taking the whole row keeps email and the audit timestamps from crossing
      // the boundary at all — the smaller the payload, the smaller the damage a
      // leaked key can do.
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        peopleCount: true,
        startDate: true,
        endDate: true,
        isSeasonal: true,
      },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(
      {
        week: {
          from: start.toFormat("yyyy-MM-dd"),
          to: end.toFormat("yyyy-MM-dd"),
          timeZone: ZONE,
        },
        count: reservations.length,
        reservations: reservations.map((reservation) => {
          const startLocal = DateTime.fromJSDate(reservation.startDate).setZone(
            ZONE,
          );
          const endLocal = DateTime.fromJSDate(reservation.endDate).setZone(
            ZONE,
          );

          return {
            id: reservation.id,
            firstName: reservation.firstName,
            lastName: reservation.lastName,
            phone: reservation.phone,
            peopleCount: reservation.peopleCount,
            date: startLocal.toFormat("yyyy-MM-dd"),
            startTime: startLocal.toFormat("HH:mm"),
            endTime: endLocal.toFormat("HH:mm"),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            isSeasonal: reservation.isSeasonal,
          };
        }),
      },
      // personal data: never cached by Vercel's edge or by the caller
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to fetch weekly reservations", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations." },
      { status: 500 },
    );
  }
}
