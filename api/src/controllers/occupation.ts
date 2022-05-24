import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class occupationController {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const occupation = await prisma.occupation.findMany();
    res.json(occupation);
  }
}
