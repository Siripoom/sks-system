import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { 
  createStop,
  updateStop,
  deleteStop
} from "../controllers/stopController";
import { 
  createStopSchema,
  updateStopSchema
} from "../schemas/route";

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

// Stop CRUD Operations
router.post("/", 
  validate(createStopSchema), 
  authorize('ADMIN', 'TEACHER'), 
  createStop
);

router.put("/:id", 
  validate(updateStopSchema), 
  authorize('ADMIN', 'TEACHER'), 
  updateStop
);

router.delete("/:id", 
  authorize('ADMIN', 'TEACHER'), 
  deleteStop
);

export default router;