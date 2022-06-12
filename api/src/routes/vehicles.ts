import express from "express";
import VehiclesContoller from "../controllers/vehicles";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const vehiclesRouter = express.Router();

const vehiclesController = new VehiclesContoller();

vehiclesRouter.use(ensureAuthenticated);
vehiclesRouter.get("/", vehiclesController.index);
vehiclesRouter.post("/", vehiclesController.create);

export default vehiclesRouter;
