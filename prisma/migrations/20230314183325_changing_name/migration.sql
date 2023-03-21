/*
  Warnings:

  - You are about to drop the `can_get_event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "can_get_event" DROP CONSTRAINT "can_get_event_event_id_fkey";

-- DropForeignKey
ALTER TABLE "can_get_event" DROP CONSTRAINT "can_get_event_user_id_fkey";

-- DropTable
DROP TABLE "can_get_event";

-- CreateTable
CREATE TABLE "who_can_get_event" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "who_can_get_event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "who_can_get_event" ADD CONSTRAINT "who_can_get_event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "who_can_get_event" ADD CONSTRAINT "who_can_get_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event_entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
