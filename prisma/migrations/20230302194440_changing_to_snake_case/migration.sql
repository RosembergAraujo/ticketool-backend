/*
  Warnings:

  - You are about to drop the column `amountAvailable` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `eventTicketId` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SoldTicket` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `eventCategory` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `amountSold` on the `event_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `event_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `event_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `event_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `event_ticket` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event_ticket` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `amount_available` to the `SoldTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `SoldTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_ticket_id` to the `SoldTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `SoldTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts_at` to the `SoldTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `SoldTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_category` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts_at` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_sold` to the `event_ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `event_ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `event_ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts_at` to the `event_ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "event_category" AS ENUM ('OUTRO', 'SHOW', 'CASAMENTO', 'ANIVERSARIO', 'FESTA', 'CONGRESSO', 'CONFERENCIA', 'CONVENCAO', 'ENCONTRO', 'FEIRA', 'FESTIVAL', 'LANCAMENTO', 'REUNIAO', 'SEMINARIO', 'WORKSHOP', 'CONCURSO');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'MANAGER', 'USER');

-- DropForeignKey
ALTER TABLE "SoldTicket" DROP CONSTRAINT "SoldTicket_eventId_fkey";

-- DropForeignKey
ALTER TABLE "SoldTicket" DROP CONSTRAINT "SoldTicket_eventTicketId_fkey";

-- DropForeignKey
ALTER TABLE "SoldTicket" DROP CONSTRAINT "SoldTicket_userId_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_userId_fkey";

-- DropForeignKey
ALTER TABLE "event_ticket" DROP CONSTRAINT "event_ticket_eventId_fkey";

-- AlterTable
ALTER TABLE "SoldTicket" DROP COLUMN "amountAvailable",
DROP COLUMN "createdAt",
DROP COLUMN "eventId",
DROP COLUMN "eventTicketId",
DROP COLUMN "expiresAt",
DROP COLUMN "startsAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "amount_available" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "event_ticket_id" TEXT NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "starts_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "createdAt",
DROP COLUMN "eventCategory",
DROP COLUMN "expiresAt",
DROP COLUMN "startsAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_category" "event_category" NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "starts_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event_ticket" DROP COLUMN "amountSold",
DROP COLUMN "createdAt",
DROP COLUMN "eventId",
DROP COLUMN "expiresAt",
DROP COLUMN "startsAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "amount_sold" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "event_id" TEXT NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "starts_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "EventCategory";

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_ticket" ADD CONSTRAINT "event_ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldTicket" ADD CONSTRAINT "SoldTicket_event_ticket_id_fkey" FOREIGN KEY ("event_ticket_id") REFERENCES "event_ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldTicket" ADD CONSTRAINT "SoldTicket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoldTicket" ADD CONSTRAINT "SoldTicket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
