import { PrismaClient } from "@prisma/client";
import express from "express";
import AppError from "../error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export default class SessionsContoller {
  constructor() {}

  async register(req: express.Request, res: express.Response) {
    const { name, login, phoneNumber, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, login, phoneNumber, email, password: hashedPassword },
    });

    res.status(201).json(user);
  }

  async login(req: express.Request, res: express.Response) {
    const { login, password } = req.body;
    // console.log(login);
    const user = await prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new AppError("user_not_found", 401);
    }
    const admin = await prisma.parkingLotAdmin.findFirst({
      where: { useId: user.id },
    });
    // console.log(admin);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AppError("invalid_password", 401);
    }

    jwt.sign(
      { id: user.id, name: user.name, login: user.login, email: user.email },
      process.env.SECRET || "",
      (err: Error | null, token: string | undefined) => {
        if (err) {
          res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

          return;
        }

        res.set("x-access-token", token);
        res.json({ user: { ...user, isAdmin: !!admin }, accessToken: token });
      }
    );

    // res.json(user);
  }
}
