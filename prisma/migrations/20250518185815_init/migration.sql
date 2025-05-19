-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "peopleCount" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_email_key" ON "Reservation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_startDate_key" ON "Reservation"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_endDate_key" ON "Reservation"("endDate");
