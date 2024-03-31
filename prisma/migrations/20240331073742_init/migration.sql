-- CreateTable
CREATE TABLE "PpaRating" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "importance" INTEGER NOT NULL DEFAULT 5,
    "easy" INTEGER NOT NULL DEFAULT 5,
    "transparency" INTEGER NOT NULL DEFAULT 5,
    "control" INTEGER NOT NULL DEFAULT 5,
    "responsibility" INTEGER NOT NULL DEFAULT 5,
    "time" INTEGER NOT NULL DEFAULT 5,
    "success_rate" INTEGER NOT NULL DEFAULT 5,
    "identity" INTEGER NOT NULL DEFAULT 5,
    "progress" INTEGER NOT NULL DEFAULT 5,
    "satisfaction" INTEGER NOT NULL DEFAULT 5,
    "preoccupancy" INTEGER NOT NULL DEFAULT 5,
    "support" INTEGER NOT NULL DEFAULT 5,
    "autonomy" INTEGER NOT NULL DEFAULT 5,
    "create_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PpaRating_pkey" PRIMARY KEY ("id")
);
