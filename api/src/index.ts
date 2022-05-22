import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import usersRouter from "./routes/user";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/users", usersRouter);

app.use(function (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

const server = app.listen(process.env.PORT, () =>
  console.log(`
server started at http://localhost:${process.env.PORT}`)
);
