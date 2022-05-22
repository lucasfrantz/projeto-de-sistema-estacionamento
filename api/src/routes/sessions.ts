import express from "express";
import SessionsContoller from "../controllers/sessions";

const sessionsRouter = express.Router();

const sessionsController = new SessionsContoller();

sessionsRouter.get("/login", sessionsController.login);
sessionsRouter.post("/register", sessionsController.register);

export default sessionsRouter;
