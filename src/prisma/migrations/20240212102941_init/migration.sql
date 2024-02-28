-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,

    UNIQUE INDEX `category`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `imagelink_square` VARCHAR(255) NOT NULL,
    `prices` FLOAT NOT NULL,
    `price_for` VARCHAR(255) NULL,
    `average_rating` FLOAT NULL,
    `ratings_count` INTEGER NULL,
    `category` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `points` INTEGER NULL,
    `manufacture_date` DATETIME(0) NOT NULL,
    `discount` FLOAT NULL,
    `expiry_date` DATETIME(0) NOT NULL,
    `hide` BOOLEAN NULL,
    `is_deleted` BOOLEAN NULL,
    `created_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,

    UNIQUE INDEX `name`(`name`),
    INDEX `category`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
