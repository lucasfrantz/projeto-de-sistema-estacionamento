import { PrismaClient } from "@prisma/client";
import express from "express";
import AppError from "../error";

const prisma = new PrismaClient();

export default class ParkingLotsController {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const parkingLots = await prisma.parkingLot.findMany();
    res.json(parkingLots);
  }
}
