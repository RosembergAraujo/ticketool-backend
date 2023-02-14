-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Roles" ("createdAt", "id", "role", "updatedAt") SELECT "createdAt", "id", "role", "updatedAt" FROM "Roles";
DROP TABLE "Roles";
ALTER TABLE "new_Roles" RENAME TO "Roles";
CREATE UNIQUE INDEX "Roles_role_key" ON "Roles"("role");
CREATE TABLE "new_GeneralUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GeneralUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GeneralUser" ("createdAt", "email", "id", "name", "password", "roleId", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "roleId", "updatedAt" FROM "GeneralUser";
DROP TABLE "GeneralUser";
ALTER TABLE "new_GeneralUser" RENAME TO "GeneralUser";
CREATE UNIQUE INDEX "GeneralUser_email_key" ON "GeneralUser"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
