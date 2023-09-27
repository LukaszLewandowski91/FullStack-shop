/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - Added the required column `notes` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productDescription` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- AlterTable
ALTER TABLE `OrderDetails` ADD COLUMN `notes` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `description`,
    ADD COLUMN `productDescription` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
