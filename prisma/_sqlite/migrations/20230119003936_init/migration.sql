/*
  Warnings:

  - You are about to alter the column `age` on the `Doggie` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doggie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Doggie" ("age", "createdAt", "id", "name", "updatedAt") SELECT "age", "createdAt", "id", "name", "updatedAt" FROM "Doggie";
DROP TABLE "Doggie";
ALTER TABLE "new_Doggie" RENAME TO "Doggie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
