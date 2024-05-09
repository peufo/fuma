/*
  Warnings:

  - The values [frends] on the enum `Post_publication` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `publication` ENUM('private', 'friends', 'public') NOT NULL;
