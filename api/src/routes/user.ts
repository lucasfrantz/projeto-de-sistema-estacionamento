import express from "express";
import UsersContoller from "../controllers/users";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = express.Router();

const usersController = new UsersContoller();

usersRouter.use(ensureAuthenticated);
usersRouter.get("/", usersController.index);
usersRouter.get("/:id", usersController.show);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);

export default usersRouter;
