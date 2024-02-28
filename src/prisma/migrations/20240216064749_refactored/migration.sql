/*
  Warnings:

  - You are about to drop the column `cart_User_Id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `liked_User_Id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_cart_User_Id_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_liked_User_Id_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `cart_User_Id`,
    DROP COLUMN `liked_User_Id`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `cart_User_Id` INTEGER NULL,
    ADD COLUMN `liked_User_Id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_liked_User_Id_fkey` FOREIGN KEY (`liked_User_Id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_cart_User_Id_fkey` FOREIGN KEY (`cart_User_Id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
