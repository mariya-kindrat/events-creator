/*
  Warnings:

  - A unique constraint covering the columns `[intent_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "intent_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_intent_id_key" ON "Booking"("intent_id");
