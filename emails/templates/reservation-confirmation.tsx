import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { DateTime } from "luxon";
import { SINGLE_RESERVATION_DURATION } from "@/lib/constants";

interface ReservationConfirmationEmailProps {
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate: Date;
  peopleCount: number;
}

const ReservationConfirmationEmail = ({
  firstName,
  lastName,
  startDate,
  peopleCount,
}: ReservationConfirmationEmailProps) => {
  const zone = "Europe/Prague";
  const locale = "cs-CZ";
  const startDt = DateTime.fromJSDate(startDate)
    .setZone(zone)
    .setLocale(locale);

  const formattedDate = startDt.toLocaleString({
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedStartTime = startDt.toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Html>
      <Head />
      <Preview>Potvrzení vaší rezervace</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={h1}>✅ Rezervace vytvořena</Heading>
            <Text style={subtitle}>Vaše rezervace byla úspěšně vytvořena.</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={sectionTitle}>Detaily rezervace</Text>
            <Hr style={divider} />

            <Section style={detailRow}>
              <Text style={label}>Jméno:</Text>
              <Text style={value}>
                {firstName} {lastName}
              </Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Datum:</Text>
              <Text style={value}>{formattedDate}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Začátek rezervace:</Text>
              <Text style={value}>{formattedStartTime}</Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Přibližná doba rezervace:</Text>
              <Text style={value}>
                {peopleCount * SINGLE_RESERVATION_DURATION} minut
              </Text>
            </Section>

            <Section style={detailRow}>
              <Text style={label}>Počet osob:</Text>
              <Text style={value}>{peopleCount}</Text>
            </Section>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Děkujeme za vaši rezervaci! V případě jakýchkoliv dotazů nás
              neváhejte kontaktovat.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f8fafc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  margin: 0,
  padding: 0,
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  // maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const headerSection = {
  textAlign: "center" as const,
  padding: "32px 24px 24px",
  backgroundColor: "#3b82f6",
  borderRadius: "12px 12px 0 0",
  margin: "-40px -20px 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 8px 0",
  padding: 0,
  letterSpacing: "-0.025em",
};

const subtitle = {
  color: "#e0e7ff",
  fontSize: "16px",
  margin: "0",
  fontWeight: "400",
};

const contentSection = {
  padding: "32px 24px",
  backgroundColor: "#ffffff",
};

const sectionTitle = {
  color: "#1f2937",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px 0",
  letterSpacing: "-0.025em",
};

const divider = {
  borderColor: "#e5e7eb",
  borderWidth: "1px",
  margin: "16px 0 24px 0",
};

const detailRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
  borderBottom: "1px solid #f3f4f6",
};

const label = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
  margin: 0,
  flex: "0 0 30%",
};

const value = {
  color: "#1f2937",
  fontSize: "14px",
  fontWeight: "600",
  margin: 0,
  flex: "0 0 70%",
  textAlign: "left" as const,
};

const footerSection = {
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "0 0 12px 12px",
  margin: "0 -20px -40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  margin: 0,
  lineHeight: "1.5",
};

export default ReservationConfirmationEmail;
