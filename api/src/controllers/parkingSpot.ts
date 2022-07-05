import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

export default class parkingSpotController {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const parkingSpots = await prisma.parkingSpot.findMany({
      select: {
        id: true,
        number: true,
        parkingLot: true,
        parkingSpotType: true,
        occupations: true,
      },
    });
    // console.log(parkingSpot);
    res.json(
      parkingSpots.map((parkingSpot) => {
        return {
          ...parkingSpot,
          occupied: !!parkingSpot.occupations.find(
            (occupation) => occupation.leftAt === null
          ),
        };
      })
    );
  }

  async empty(req: express.Request, res: express.Response) {
    const parkingSpot = await prisma.parkingSpot.findMany({
      select: { id: true, number: true, parkingLot: true },
      where: {
        occupations: {
          every: {
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

  async create(req: express.Request, res: express.Response) {
    const { parkingLotId, price, number } = req.body;

    const parkingSpotType = await prisma.parkingSpotType.create({
      data: {
        size: "normal",
        price: Number(price),
        name: "normal",
      },
    });

    const vehicle = await prisma.parkingSpot.create({
      data: {
        parkingLotId,
        number: Number(number),
        parkingSpotTypeId: parkingSpotType.id,
      },
    });

    res.status(201).json(vehicle);
  }
}
