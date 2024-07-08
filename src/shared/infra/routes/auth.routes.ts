import { AuthController } from "@modules/admin/useCases/auth/AuthController";
import { Router } from "express";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/sessions", authController.handle);

export { authRoutes };
