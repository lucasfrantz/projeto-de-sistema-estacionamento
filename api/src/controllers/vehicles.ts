import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class VehiclesContoller {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const { user } = req;
    console.log(user?.id);
    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId: user?.id },
    });
    console.log(vehicles);
    res.json(vehicles);
  }

  async create(req: express.Request, res: express.Response) {
    const { model, licensePlate, color, ownerId } = req.body;
    let userId = ownerId;

    if (!userId) {
      userId = req.user?.id;
    }
    const vehicle = await prisma.vehicle.create({
      data: { model, licensePlate, color, ownerId: userId },
    });

    res.status(201).json(vehicle);
  }
}
