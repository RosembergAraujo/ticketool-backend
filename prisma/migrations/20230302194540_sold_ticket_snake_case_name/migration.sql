/*
  Warnings:

  - You are about to drop the `SoldTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SoldTicket" DROP CONSTRAINT "SoldTicket_event_id_fkey";

-- DropForeignKey
ALTER TABLE "SoldTicket" DROP CONSTRAINT "SoldTicket_event_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "SoldTicket" DROP CONSTRAINT "SoldTicket_user_id_fkey";

-- DropTable
DROP TABLE "SoldTicket";

-- CreateTable
CREATE TABLE "sold_ticket" (
    "id" TEXT NOT NULL,
    "tittle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount_available" INTEGER NOT NULL,
    "event_id" TEXT NOT NULL,
    "event_ticket_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sold_ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sold_ticket_id_key" ON "sold_ticket"("id");

-- AddForeignKey
ALTER TABLE "sold_ticket" ADD CONSTRAINT "sold_ticket_event_ticket_id_fkey" FOREIGN KEY ("event_ticket_id") REFERENCES "event_ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sold_ticket" ADD CONSTRAINT "sold_ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sold_ticket" ADD CONSTRAINT "sold_ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
