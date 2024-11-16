-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SkiSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ski" BOOLEAN NOT NULL,
    "skiBoot" BOOLEAN NOT NULL,
    "skiPole" BOOLEAN NOT NULL,
    "skiHelmet" BOOLEAN NOT NULL,
    "skiGoogle" BOOLEAN NOT NULL,
    "ageCategoryId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    CONSTRAINT "SkiSet_ageCategoryId_fkey" FOREIGN KEY ("ageCategoryId") REFERENCES "AgeCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SkiSet_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AgeCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
