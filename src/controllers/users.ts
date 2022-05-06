import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class UsersContoller {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const users = await prisma.user.findMany();
    res.json(users);
  }
}
