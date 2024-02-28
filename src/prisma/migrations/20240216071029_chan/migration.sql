/*
  Warnings:

  - You are about to drop the column `cart_User_Id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `liked_User_Id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_cart_User_Id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_liked_User_Id_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `cart_User_Id`,
    DROP COLUMN `liked_User_Id`,
    ADD COLUMN `cart_Product` INTEGER NULL,
    ADD COLUMN `liked_Product` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_liked_Product_fkey` FOREIGN KEY (`liked_Product`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_cart_Product_fkey` FOREIGN KEY (`cart_Product`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
