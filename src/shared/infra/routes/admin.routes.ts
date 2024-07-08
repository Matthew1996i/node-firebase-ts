import { UserController } from "@modules/admin/useCases/user/UserController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/middlewares/ensureAuthenticated";

const adminRoutes = Router();

const userController = new UserController();

adminRoutes.post("/user", userController.handleCreate);

adminRoutes.put("/user", ensureAuthenticated, userController.handleUpdate);

adminRoutes.put(
  "/userPassword",
  ensureAuthenticated,
  userController.handleUpdatePassword
);

adminRoutes.put(
  "/userStatus",
  ensureAuthenticated,
  userController.handleUpdateStatus
);

adminRoutes.get("/user/:id", ensureAuthenticated, userController.handleFind);

adminRoutes.get("/users", ensureAuthenticated, userController.handleList);

export { adminRoutes };
