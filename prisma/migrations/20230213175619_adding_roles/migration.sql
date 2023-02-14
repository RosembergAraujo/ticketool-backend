/*
  Warnings:

  - Added the required column `updatedAt` to the `GeneralUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GeneralUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GeneralUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GeneralUser" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "GeneralUser";
DROP TABLE "GeneralUser";
ALTER TABLE "new_GeneralUser" RENAME TO "GeneralUser";
CREATE UNIQUE INDEX "GeneralUser_email_key" ON "GeneralUser"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_role_key" ON "Roles"("role");
