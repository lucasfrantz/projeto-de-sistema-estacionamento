import express from "express";
import ParkingLotsController from "../controllers/parkinglots";
import ParkingspotContoller from "../controllers/parkingSpot";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const parkinglotsRouter = express.Router();

const parkingLotController = new ParkingLotsController();

parkinglotsRouter.use(ensureAuthenticated);
parkinglotsRouter.get("/", parkingLotController.index);

export default parkinglotsRouter;
