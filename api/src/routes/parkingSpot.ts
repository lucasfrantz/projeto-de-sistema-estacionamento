import express from "express";
import ParkingspotContoller from "../controllers/parkingSpot";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const parkingspotRouter = express.Router();

const parkingspotController = new ParkingspotContoller();

parkingspotRouter.use(ensureAuthenticated);
parkingspotRouter.get("/", parkingspotController.index);
// parkingspotRouter.get("/:id/parkingSpot", parkingspotController.index);
parkingspotRouter.get("/:id/parkingSpot/:id2", parkingspotController.show);

export default parkingspotRouter;
