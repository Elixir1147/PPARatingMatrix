/*
  Warnings:

  - The primary key for the `PpaRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `create_data` on the `PpaRating` table. All the data in the column will be lost.
  - The `id` column on the `PpaRating` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PpaRating" DROP CONSTRAINT "PpaRating_pkey",
DROP COLUMN "create_data",
ADD COLUMN     "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "importance_other" INTEGER NOT NULL DEFAULT 5,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PpaRating_pkey" PRIMARY KEY ("id");
