import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class UsersContoller {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const users = await prisma.user.findMany();
    res.json(users);
  }

  async show(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.json(user);
  }

  async create(req: express.Request, res: express.Response) {
    const { name, email, password, login, phoneNumber } = req.body;

    const user = await prisma.user.create({
      data: { name, email, password, login, phoneNumber },
    });

    res.status(201).json(user);
  }

  async update(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const { name, email, password, login, phoneNumber } = req.body;

    const user = await prisma.user.update({
      data: { name, email, password, login, phoneNumber },
      where: { id },
    });

    res.status(201).json(user);
  }
}
