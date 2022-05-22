require("express-async-errors");
import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import AppError from "./error";
import sessionsRouter from "./routes/sessions";
import usersRouter from "./routes/user";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);

app.use(function (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // console.log(err);
  // if (err instanceof AppError) {
  //   console.log("xxxxx");
  //   return res.status(err.statusCode).json({
  //     status: "error",
  //     message: err.message,
  //   });
  // }

  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

const server = app.listen(process.env.PORT, () =>
  console.log(`
server started at http://localhost:${process.env.PORT}`)
);
