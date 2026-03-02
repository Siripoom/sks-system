import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createSchoolSchema, updateSchoolSchema } from "../schemas/school";
import * as schoolController from "../controllers/schoolController";

const router = Router();

// router.use(authenticate);

router.post("/", validate(createSchoolSchema), schoolController.createSchool);
router.get("/", schoolController.getSchools);
router.get("/:id", schoolController.getSchoolById);
router.put("/:id", validate(updateSchoolSchema), schoolController.updateSchool);
router.delete("/:id", schoolController.deleteSchool);

export default router;
