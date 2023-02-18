-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('OUTRO', 'SHOW', 'CASAMENTO', 'ANIVERSARIO', 'FESTA', 'CONGRESSO', 'CONFERENCIA', 'CONVENCAO', 'ENCONTRO', 'FEIRA', 'FESTIVAL', 'LANCAMENTO', 'REUNIAO', 'SEMINARIO', 'WORKSHOP', 'CONCURSO');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "tittle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "event_category" "EventCategory" NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
