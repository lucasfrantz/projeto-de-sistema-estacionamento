import express from "express";
import OccupationController from "../controllers/occupation";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const occupationRouter = express.Router();

const occupationController = new OccupationController();

occupationRouter.use(ensureAuthenticated);
occupationRouter.get("/", occupationController.index);

export default occupationRouter;