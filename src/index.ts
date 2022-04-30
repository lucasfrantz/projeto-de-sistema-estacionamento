import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get(`/`, async (req, res) => {
  res.json("Hello World!");
});

const server = app.listen(process.env.PORT, () =>
  console.log(`running at ${process.env.PORT}`)
);
