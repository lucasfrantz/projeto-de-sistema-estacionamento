import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class parkingSpotController {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const parkingSpot = await prisma.parkingSpot.findMany({
      select: { id: true, number: true, parkingLot: true },
    });
    // console.log(parkingSpot);
    res.json(parkingSpot);
  }

  async empty(req: express.Request, res: express.Response) {
    const parkingSpot = await prisma.parkingSpot.findMany({
      select: { id: true, number: true, parkingLot: true },
      where: {
        occupations: {
          some: {
            leftAt: {
              not: null,
            },
          },
        },
      },
    });
    // console.log(parkingSpot);
    res.json(parkingSpot);
  }

  async show(req: express.Request, res: express.Response) {
    // const { id, id2 } = req.params;
    // const parkingSpot = await prisma.parkingSpot.findUnique({
    //   where: {
    //     id,
    //   },
    // });
    // res.json(parkingSpot[id2]);
  }
}
