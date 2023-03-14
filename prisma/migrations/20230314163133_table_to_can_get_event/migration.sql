-- CreateTable
CREATE TABLE "can_get_event" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "can_get_event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "can_get_event" ADD CONSTRAINT "can_get_event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "can_get_event" ADD CONSTRAINT "can_get_event_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event_entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
