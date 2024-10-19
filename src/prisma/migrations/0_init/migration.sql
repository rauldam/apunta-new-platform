-- CreateTable
CREATE TABLE `ads` (
    `id` BINARY(16) NOT NULL,
    `type` ENUM('ads', 'signage') NULL DEFAULT 'ads',
    `user_space` TEXT NULL,
    `is_downloaded` TINYINT NOT NULL DEFAULT 0,
    `ad_price` DOUBLE NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `courts_id` BINARY(16) NOT NULL,
    `users_id` BINARY(16) NOT NULL,

    INDEX `fk_ads_courts1_idx`(`courts_id`),
    INDEX `fk_ads_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courts` (
    `id` BINARY(16) NOT NULL,
    `mac` VARCHAR(45) NOT NULL,
    `match_time` INTEGER NOT NULL DEFAULT 90,
    `is_streaming_configured` TINYINT NOT NULL DEFAULT 0,
    `is_available` TINYINT NOT NULL DEFAULT 1,
    `court_price` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `users_id` BINARY(16) NOT NULL,
    `plan_id` BINARY(16) NOT NULL,

    INDEX `fk_courts_plan1_idx`(`plan_id`),
    INDEX `fk_courts_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courts_has_streaming` (
    `courts_id` BINARY(16) NOT NULL,
    `streaming_id` BINARY(16) NOT NULL,

    INDEX `fk_courts_has_streaming_courts1_idx`(`courts_id`),
    INDEX `fk_courts_has_streaming_streaming1_idx`(`streaming_id`),
    PRIMARY KEY (`courts_id`, `streaming_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devices` (
    `id` BINARY(16) NOT NULL,
    `type` ENUM('box', 'sensor', 'camera') NOT NULL,
    `mac` VARCHAR(45) NOT NULL,
    `ssid` VARCHAR(45) NOT NULL,
    `status` TINYINT NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `courts_id` BINARY(16) NOT NULL,

    INDEX `fk_devices_courts1_idx`(`courts_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` BINARY(16) NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `vat` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `status` ENUM('pending', 'paid', 'error', 'canceled') NULL DEFAULT 'pending',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `users_id` BINARY(16) NOT NULL,
    `payments_id` BINARY(16) NOT NULL,

    INDEX `fk_invoices_payments1_idx`(`payments_id`),
    INDEX `fk_invoices_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matches` (
    `id` BINARY(16) NOT NULL,
    `players` VARCHAR(45) NOT NULL,
    `mode` VARCHAR(45) NOT NULL,
    `camera_mode` VARCHAR(45) NOT NULL,
    `status` ENUM('pending', 'waiting', 'playing', 'finished') NOT NULL DEFAULT 'pending',
    `playing_time` VARCHAR(45) NOT NULL DEFAULT '90',
    `video_url` TEXT NULL,
    `livescore` TEXT NULL,
    `email` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `courts_id` BINARY(16) NOT NULL,
    `users_id` BINARY(16) NOT NULL,

    INDEX `fk_matches_courts1_idx`(`courts_id`),
    INDEX `fk_matches_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` BINARY(16) NOT NULL,
    `status` ENUM('pending', 'completed', 'error', 'canceled') NOT NULL DEFAULT 'pending',
    `expiration` DATETIME(0) NOT NULL,
    `card_end` VARCHAR(45) NOT NULL,
    `card_type` VARCHAR(45) NOT NULL,
    `second_chance` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plan` (
    `id` BINARY(16) NOT NULL,
    `type` ENUM('basic', 'premium') NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` BINARY(16) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `vat` VARCHAR(45) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `users_id` BINARY(16) NOT NULL,

    UNIQUE INDEX `vat_UNIQUE`(`vat`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_profile_users_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` BINARY(16) NOT NULL,
    `rol` ENUM('admin', 'support', 'accountant', 'user') NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `streaming` (
    `id` BINARY(16) NOT NULL,
    `service` ENUM('record', 'youtube') NOT NULL,
    `url_service` TEXT NOT NULL,
    `channel_id` VARCHAR(255) NULL,
    `token` VARCHAR(255) NULL,
    `refresh_token` VARCHAR(255) NULL,
    `livestream_id` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `users_id` BINARY(16) NOT NULL,

    INDEX `fk_streaming_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tickets` (
    `id` BINARY(16) NOT NULL,
    `message` TEXT NOT NULL,
    `message_type` ENUM('user', 'staff') NOT NULL,
    `ticket_ref` VARCHAR(45) NOT NULL,
    `is_closed` TINYINT NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `users_id` BINARY(16) NOT NULL,

    INDEX `fk_tickets_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BINARY(16) NOT NULL,
    `login` VARCHAR(45) NOT NULL,
    `pwd` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `active` TINYINT NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,
    `roles_id` BINARY(16) NOT NULL,

    UNIQUE INDEX `login_UNIQUE`(`login`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_users_roles1_idx`(`roles_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ads` ADD CONSTRAINT `fk_ads_courts1` FOREIGN KEY (`courts_id`) REFERENCES `courts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ads` ADD CONSTRAINT `fk_ads_users1` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `courts` ADD CONSTRAINT `fk_courts_plan1` FOREIGN KEY (`plan_id`) REFERENCES `plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `courts` ADD CONSTRAINT `fk_courts_users1` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `courts_has_streaming` ADD CONSTRAINT `fk_courts_has_streaming_courts1` FOREIGN KEY (`courts_id`) REFERENCES `courts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `courts_has_streaming` ADD CONSTRAINT `fk_courts_has_streaming_streaming1` FOREIGN KEY (`streaming_id`) REFERENCES `streaming`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `fk_devices_courts1` FOREIGN KEY (`courts_id`) REFERENCES `courts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `fk_invoices_payments1` FOREIGN KEY (`payments_id`) REFERENCES `payments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `fk_invoices_users1` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `fk_matches_courts1` FOREIGN KEY (`courts_id`) REFERENCES `courts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `fk_matches_users1` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `fk_profile_users` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `streaming` ADD CONSTRAINT `fk_streaming_users1` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `fk_tickets_users1` FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_users_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

