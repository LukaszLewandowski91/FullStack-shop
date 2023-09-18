/*
  Warnings:

  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - Added the required column `amountPay` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountProducts` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `amount`,
    ADD COLUMN `amountPay` DOUBLE NOT NULL,
    ADD COLUMN `amountProducts` INTEGER NOT NULL;
