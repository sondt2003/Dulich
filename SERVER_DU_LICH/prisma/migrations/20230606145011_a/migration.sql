-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "remember_token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN DEFAULT true,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180',
    "userID" INTEGER NOT NULL,
    "cityID" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "place_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "place_cityID_fkey" FOREIGN KEY ("cityID") REFERENCES "city" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "placeID" INTEGER NOT NULL,
    "cmt" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comment_placeID_fkey" FOREIGN KEY ("placeID") REFERENCES "place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "travelEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "placeID" INTEGER NOT NULL,
    "event" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "travelEvent_placeID_fkey" FOREIGN KEY ("placeID") REFERENCES "place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "placeID" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vote_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vote_placeID_fkey" FOREIGN KEY ("placeID") REFERENCES "place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "city" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "city_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "place_id_key" ON "place"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_id_key" ON "comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "travelEvent_id_key" ON "travelEvent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vote_id_key" ON "vote"("id");

-- CreateIndex
CREATE UNIQUE INDEX "city_id_key" ON "city"("id");

-- CreateIndex
CREATE UNIQUE INDEX "city_created_at_key" ON "city"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "city_updated_at_key" ON "city"("updated_at");
