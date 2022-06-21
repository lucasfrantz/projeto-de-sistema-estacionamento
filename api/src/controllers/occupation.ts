import { PrismaClient } from "@prisma/client";
import express from "express";
import AppError from "../error";

const prisma = new PrismaClient();

export default class occupationController {
  constructor() {}

  async index(req: express.Request, res: express.Response) {
    const { user } = req;
    // console.log(user?.id);
    const vehicles = await prisma.vehicle.findMany({
      where: { ownerId: user?.id },
    });
    // console.log(vehicles);

    const occupations = user?.isAdmin
      ? await prisma.occupation.findMany({
          select: {
            arrivedAt: true,
            leftAt: true,
            vehicle: true,
            id: true,
            parkingSpot: {
              select: {
                parkingLot: true,
                parkingSpotType: true,
                number: true,
              },
            },
          },
        })
      : await prisma.occupation.findMany({
          where: { vehicleId: { in: vehicles.map((vehicle) => vehicle.id) } },
          select: {
            arrivedAt: true,
            leftAt: true,
            vehicle: true,
            id: true,
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
  async current(req: express.Request, res: express.Response) {
    const { user } = req;

    const occupations = await prisma.occupation.findMany({
      select: {
        arrivedAt: true,
        leftAt: true,
        vehicle: true,
        id: true,
        parkingSpot: {
          select: {
            parkingLot: true,
            parkingSpotType: true,
            number: true,
          },
        },
      },
      where: {
        leftAt: null,
      },
    });

    console.log(occupations);

    res.json(occupations);
  }

  async create(req: express.Request, res: express.Response) {
    const { user } = req;
    if (!user?.isAdmin) {
      throw new AppError("user_not_admin", 401);
    }
    const { vehicleId, parkingSpotId } = req.body;

    const occupation = await prisma.occupation.create({
      data: { vehicleId, parkingSpotId, arrivedAt: new Date() },
    });

    res.status(201).json(occupation);
  }
  async finish(req: express.Request, res: express.Response) {
    const { user } = req;

    if (!user?.isAdmin) {
      throw new AppError("user_not_admin", 401);
    }
    const { id } = req.params;

    const occupation = await prisma.occupation.findUnique({
      where: { id },
    });
    if (!occupation) {
      throw new AppError("occupation_not_found", 404);
    }
    occupation.leftAt = new Date();

    await prisma.occupation.update({
      where: { id: occupation.id },
      data: occupation,
    });

    res.status(201).json(occupation);
  }
}
