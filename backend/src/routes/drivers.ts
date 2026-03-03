import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

// router.use(authenticate);

router.get("/", (_, res) => {
  res.json({
    success: true,
    data: {
      drivers: [],
      pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    },
  });
});

router.get("/:id", (_, res) => {
  res.json({ success: true, data: { driver: null } });
});

router.post("/", (_, res) => {
  res.json({ success: true, data: { driver: null } });
});

router.put("/:id", (_, res) => {
  res.json({ success: true, data: { driver: null } });
});

router.delete("/:id", (_, res) => {
  res.json({ success: true, message: "Driver deleted successfully" });
});

export default router;
