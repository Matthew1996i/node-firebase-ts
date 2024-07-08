import { Router } from "express";

import { adminRoutes } from "./admin.routes";
import { authRoutes } from "./auth.routes";

const router = Router();

router.use(adminRoutes);
router.use(authRoutes);

export { router };
