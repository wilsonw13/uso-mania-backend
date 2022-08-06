/* import { express, NextFunction, Request, Response } from "express"; */

import { PrismaClient } from "@prisma/client";

const express = require("express");
// const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
/* const app = express();

app.get("/feed", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  res.json(posts);
});

app.post("/post", async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(post);
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  });
  res.json(post);
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  res.json(user);
});

const server = app.listen(3000);
 */

async function createAccount() {
  await prisma.user.deleteMany();
  await prisma.userSettings.deleteMany();
  await prisma.userStats.deleteMany();

  const user = await prisma.user.create({
    data: {
      userId: "1309",
      username: "wilson",
      settings: {
        create: {},
      },
      stats: {
        create: {},
      },
    },
  });

  console.log(user);

  const settings = await prisma.userSettings.findMany();
  console.log(settings);

  const stats = await prisma.userStats.findMany();
  console.log(stats);
}

createAccount()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
