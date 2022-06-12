import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class occupationController {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const { user } = req;
    console.log(user?.id);
    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId: user?.id },
    });
    console.log(vehicles);
    const occupations = await prisma.occupation.findMany({
      where: { vehicleId: { in: vehicles.map((vehicle) => vehicle.id) } },
      select: {
        arrivedAt: true,
        leftAt: true,
        vehicle: true,
        parkingSpot: {
          select: {
            parkingLot: true,
            parkingSpotType: true,
            number: true,
          },
        },
      },
    });
    res.json(occupations);
  }
}
