-- AlterTable
ALTER TABLE `products` ADD COLUMN `cart_User_Id` INTEGER NULL,
    ADD COLUMN `category_name` VARCHAR(255) NULL,
    ADD COLUMN `liked_User_Id` INTEGER NULL;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `email_id` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `password` TEXT NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,

    UNIQUE INDEX `email_id`(`email_id`),
    UNIQUE INDEX `phone_number`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_liked_User_Id_fkey` FOREIGN KEY (`liked_User_Id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_cart_User_Id_fkey` FOREIGN KEY (`cart_User_Id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
