-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `pfpId` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSettings` (
    `userId` VARCHAR(191) NOT NULL,
    `volumeMaster` DOUBLE NOT NULL DEFAULT 1,
    `volumeMusic` DOUBLE NOT NULL DEFAULT 0.5,
    `volumeHitSound` DOUBLE NOT NULL DEFAULT 0.5,
    `scrollSpeed` INTEGER NOT NULL DEFAULT 10,
    `keys1` VARCHAR(191) NOT NULL DEFAULT ' ',
    `keys2` VARCHAR(191) NOT NULL DEFAULT 'FJ',
    `keys3` VARCHAR(191) NOT NULL DEFAULT 'F J',
    `keys4` VARCHAR(191) NOT NULL DEFAULT 'DFJK',
    `keys5` VARCHAR(191) NOT NULL DEFAULT 'DF JK',
    `keys6` VARCHAR(191) NOT NULL DEFAULT 'SDFJKL',
    `keys7` VARCHAR(191) NOT NULL DEFAULT 'SDF JKL',
    `keys8` VARCHAR(191) NOT NULL DEFAULT 'ASDFJKL;',
    `keys9` VARCHAR(191) NOT NULL DEFAULT 'ASDF JKL;',

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPlayedBeatmap` (
    `userId` VARCHAR(191) NOT NULL,
    `beatmapSetId` INTEGER NOT NULL,
    `beatmapId` INTEGER NOT NULL,
    `highestScore` INTEGER NOT NULL,
    `highestAccuracy` DOUBLE NOT NULL,
    `highestMaxCombo` INTEGER NOT NULL,
    `highestGrade` VARCHAR(191) NOT NULL,
    `playCount` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `beatmapSetId`, `beatmapId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserScoreEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `beatmapSetId` INTEGER NOT NULL,
    `beatmapId` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `accuracy` DOUBLE NOT NULL,
    `maxCombo` INTEGER NOT NULL,
    `grade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
