import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import * as userController from "../controllers/userController";

const router = Router();

// router.use(authenticate);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/", userController.createUser);

export default router;
