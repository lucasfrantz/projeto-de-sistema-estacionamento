import express from "express";
import UsersContoller from "../controllers/users";

const usersRouter = express.Router();

const usersController = new UsersContoller();

usersRouter.get("/", usersController.index);
usersRouter.get("/:id", usersController.show);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);

export default usersRouter;
