import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import usersRouter from "./routes/user";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/users", usersRouter);

const server = app.listen(process.env.PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${process.env.PORT}`)
);
