/*
  Warnings:

  - Made the column `id` on table `Occupation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Occupation_vehicleId_parkingSpotId_arrivedAt_key";

-- AlterTable
ALTER TABLE "Occupation" ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id");
