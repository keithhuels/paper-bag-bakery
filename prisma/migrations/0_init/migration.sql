-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "verified" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");

