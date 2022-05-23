import { PrismaClient } from "@prisma/client";
import express from "express";
import { appendFile } from "fs";

const prisma = new PrismaClient();

import jwt, { JwtPayload } from "jsonwebtoken";
import { nextTick } from "process";
import AppError from "../error";

interface TokenPayload extends JwtPayload {
  id: string;
  name: string;
  login: string;
  email: string;
}

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : req.headers["authorization"];
  if (!token) {
    throw new AppError("token_not_found", 401);
  }
  // Efetuando a validação do JWT:
  jwt.verify(token, process.env.SECRET || "", async (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }
    console.log(userInfo);
    if (userInfo && typeof userInfo !== "string") {
      const user = await prisma.user.findUnique({ where: { id: userInfo.id } });
      if (user) {
        req.user = {
          id: user.id,
          name: user.name,
          login: user.login,
          email: user.email,
        };
      }
    }
    next();
    // Se chegou aqui, o token foi validado com sucesso:
    // req.user = await prisma.user.findUnique({ where: { id: userInfo.id } });
    // res.json(userInfo);
  });
};
