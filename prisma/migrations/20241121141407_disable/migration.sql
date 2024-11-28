/*
  Warnings:

  - You are about to drop the `AgeCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `ageCategoryId` on the `SkiSet` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AgeCategory";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SkiSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ski" BOOLEAN NOT NULL,
    "skiBoot" BOOLEAN NOT NULL,
    "skiPole" BOOLEAN NOT NULL,
    "skiHelmet" BOOLEAN NOT NULL,
    "skiGoogle" BOOLEAN NOT NULL,
    "reservationId" TEXT NOT NULL,
    CONSTRAINT "SkiSet_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SkiSet" ("id", "reservationId", "ski", "skiBoot", "skiGoogle", "skiHelmet", "skiPole") SELECT "id", "reservationId", "ski", "skiBoot", "skiGoogle", "skiHelmet", "skiPole" FROM "SkiSet";
DROP TABLE "SkiSet";
ALTER TABLE "new_SkiSet" RENAME TO "SkiSet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
