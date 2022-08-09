-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(20) NOT NULL,
    `pfpId` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NOT NULL DEFAULT '',
    `characters` VARCHAR(191) NOT NULL DEFAULT '[]',

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
    `keys1` VARCHAR(1) NOT NULL DEFAULT ' ',
    `keys2` VARCHAR(2) NOT NULL DEFAULT 'FJ',
    `keys3` VARCHAR(3) NOT NULL DEFAULT 'F J',
    `keys4` VARCHAR(4) NOT NULL DEFAULT 'DFJK',
    `keys5` VARCHAR(5) NOT NULL DEFAULT 'DF JK',
    `keys6` VARCHAR(6) NOT NULL DEFAULT 'SDFJKL',
    `keys7` VARCHAR(7) NOT NULL DEFAULT 'SDF JKL',
    `keys8` VARCHAR(8) NOT NULL DEFAULT 'ASDFJKL;',
    `keys9` VARCHAR(9) NOT NULL DEFAULT 'ASDF JKL;',

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserStats` (
    `userId` VARCHAR(191) NOT NULL,
    `averageScore` INTEGER NOT NULL DEFAULT 0,
    `averageAccuracy` DOUBLE NOT NULL DEFAULT 0,
    `highestMaxCombo` DOUBLE NOT NULL DEFAULT 0,
    `playCountUnique` INTEGER NOT NULL DEFAULT 0,
    `SS` INTEGER NOT NULL DEFAULT 0,
    `S` INTEGER NOT NULL DEFAULT 0,
    `A` INTEGER NOT NULL DEFAULT 0,
    `B` INTEGER NOT NULL DEFAULT 0,
    `C` INTEGER NOT NULL DEFAULT 0,
    `D` INTEGER NOT NULL DEFAULT 0,

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
    `highestGrade` VARCHAR(2) NOT NULL,
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
    `grade` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
