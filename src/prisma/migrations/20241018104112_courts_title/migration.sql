/*
  Warnings:

  - Added the required column `title` to the `courts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courts` ADD COLUMN `title` VARCHAR(45) NOT NULL;
