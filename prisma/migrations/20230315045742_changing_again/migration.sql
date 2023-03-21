/*
  Warnings:

  - You are about to drop the `who_can_get_event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "who_can_get_event" DROP CONSTRAINT "who_can_get_event_event_id_fkey";

-- DropForeignKey
ALTER TABLE "who_can_get_event" DROP CONSTRAINT "who_can_get_event_user_id_fkey";

-- DropTable
DROP TABLE "who_can_get_event";

-- CreateTable
CREATE TABLE "private_event_guest" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "private_event_guest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "private_event_guest" ADD CONSTRAINT "private_event_guest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_event_guest" ADD CONSTRAINT "private_event_guest_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event_entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
