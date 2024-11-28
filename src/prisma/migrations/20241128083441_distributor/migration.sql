-- AlterTable
ALTER TABLE `courts` ADD COLUMN `distributor_id` BINARY(16) NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `rol` ENUM('admin', 'support', 'accountant', 'user', 'distributor') NOT NULL;

-- CreateTable
CREATE TABLE `distributors` (
    `id` BINARY(16) NOT NULL,
    `discount` DOUBLE NULL,
    `commission` FLOAT NOT NULL DEFAULT 25.00,
    `device_price` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `users_id` BINARY(16) NOT NULL,

    INDEX `fk_distributor_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `distributors` ADD CONSTRAINT `fk_distributor_users1` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
