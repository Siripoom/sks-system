import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { validateQuery } from "../middleware/validateQuery";
import {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  toggleRouteStatus,
  bulkUpdateRoutes,
  duplicateRoute,
} from "../controllers/routeController";
import {
  getRouteStops,
  reorderStops,
  getRouteAssignments,
  assignStudentsToRoute,
  removeStudentFromRoute,
} from "../controllers/stopController";
import {
  createRouteSchema,
  updateRouteSchema,
  routeFiltersSchema,
  reorderStopsSchema,
  assignStudentsSchema,
  bulkUpdateRoutesSchema,
  duplicateRouteSchema,
} from "../schemas/route";

const router = Router();

// Apply authentication to all routes
// router.use(authenticate);

// Route CRUD Operations
router.get(
  "/",
  validateQuery(routeFiltersSchema),
  // authorize('ADMIN', 'TEACHER'),
  getRoutes,
);

router.get(
  "/:id",
  // authorize('ADMIN', 'TEACHER'),
  getRouteById,
);

router.post(
  "/",
  validate(createRouteSchema),
  // authorize('ADMIN', 'TEACHER'),
  createRoute,
);

router.put(
  "/:id",
  validate(updateRouteSchema),
  // authorize('ADMIN', 'TEACHER'),
  updateRoute,
);

router.delete(
  "/:id",
  // authorize('ADMIN', 'TEACHER'),
  deleteRoute,
);

router.patch(
  "/:id/toggle-status",
  // authorize('ADMIN', 'TEACHER'),
  toggleRouteStatus,
);

// Bulk Operations
router.patch(
  "/bulk",
  validate(bulkUpdateRoutesSchema),
  // authorize('ADMIN'),
  bulkUpdateRoutes,
);

router.post(
  "/:id/duplicate",
  validate(duplicateRouteSchema),
  // authorize('ADMIN', 'TEACHER'),
  duplicateRoute,
);

// Stop Management
router.get(
  "/:id/stops",
  // authorize('ADMIN', 'TEACHER'),
  getRouteStops,
);

router.patch(
  "/:id/stops/reorder",
  validate(reorderStopsSchema),
  // authorize('ADMIN', 'TEACHER'),
  reorderStops,
);

// Student Assignment Management
router.get(
  "/:id/assignments",
  // authorize('ADMIN', 'TEACHER'),
  getRouteAssignments,
);

router.post(
  "/:id/assign-students",
  validate(assignStudentsSchema),
  // authorize('ADMIN', 'TEACHER'),
  assignStudentsToRoute,
);

router.delete(
  "/:id/students/:studentId",
  // authorize('ADMIN', 'TEACHER'),
  removeStudentFromRoute,
);

export default router;
