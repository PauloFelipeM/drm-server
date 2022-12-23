/*
  Warnings:

  - Added the required column `storageName` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `videos` ADD COLUMN `storageName` VARCHAR(191) NOT NULL;
