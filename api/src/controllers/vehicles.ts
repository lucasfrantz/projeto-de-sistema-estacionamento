import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class VehiclesContoller {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  }
}
