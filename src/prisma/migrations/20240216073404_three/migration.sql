/*
  Warnings:

  - You are about to drop the column `cart_Product` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `liked_Product` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_category2topost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_category2topost` DROP FOREIGN KEY `_Category2ToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_category2topost` DROP FOREIGN KEY `_Category2ToPost_B_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_cart_Product_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_liked_Product_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `usersId` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `cart_Product`,
    DROP COLUMN `liked_Product`;

-- DropTable
DROP TABLE `_category2topost`;

-- DropTable
DROP TABLE `category2`;

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `_likedUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_likedUsers_AB_unique`(`A`, `B`),
    INDEX `_likedUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_cartUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_cartUsers_AB_unique`(`A`, `B`),
    INDEX `_cartUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_likedUsers` ADD CONSTRAINT `_likedUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_likedUsers` ADD CONSTRAINT `_likedUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_cartUsers` ADD CONSTRAINT `_cartUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_cartUsers` ADD CONSTRAINT `_cartUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
