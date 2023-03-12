/*
  Warnings:

  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_user_id_fkey";

-- DropForeignKey
ALTER TABLE "event_ticket" DROP CONSTRAINT "event_ticket_event_id_fkey";

-- DropForeignKey
ALTER TABLE "sold_ticket" DROP CONSTRAINT "sold_ticket_event_id_fkey";

-- DropTable
DROP TABLE "event";

-- CreateTable
CREATE TABLE "event_entity" (
    "id" TEXT NOT NULL,
    "tittle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_category" "event_category" NOT NULL,
    "published" BOOLEAN NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_entity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_entity_id_key" ON "event_entity"("id");

-- AddForeignKey
ALTER TABLE "event_entity" ADD CONSTRAINT "event_entity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_ticket" ADD CONSTRAINT "event_ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event_entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sold_ticket" ADD CONSTRAINT "sold_ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event_entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
