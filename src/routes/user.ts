import express from "express";
import UsersContoller from "../controllers/users";

const usersRouter = express.Router();

const usersController = new UsersContoller();

usersRouter.get("/", usersController.index);

export default usersRouter;
