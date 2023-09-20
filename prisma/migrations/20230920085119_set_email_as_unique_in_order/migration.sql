/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Order_email_key` ON `Order`(`email`);
