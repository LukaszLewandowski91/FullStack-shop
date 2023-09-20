-- DropForeignKey
ALTER TABLE `OrderDetails` DROP FOREIGN KEY `OrderDetails_orderId_fkey`;

-- AddForeignKey
ALTER TABLE `OrderDetails` ADD CONSTRAINT `OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
