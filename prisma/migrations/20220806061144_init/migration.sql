/*
  Warnings:

  - You are about to alter the column `highestGrade` on the `userplayedbeatmap` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("UserPlayedBeatmap_highestGrade")`.
  - You are about to alter the column `grade` on the `userscoreentry` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("UserScoreEntry_grade")`.

*/
-- AlterTable
ALTER TABLE `userplayedbeatmap` MODIFY `highestGrade` ENUM('SS', 'S', 'A', 'B', 'C', 'D') NOT NULL;

-- AlterTable
ALTER TABLE `userscoreentry` MODIFY `grade` ENUM('SS', 'S', 'A', 'B', 'C', 'D') NOT NULL;
