"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', (0, auth_1.authorize)('ADMIN'), (_, res) => {
    res.json({ success: true, data: { events: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } } });
});
router.get('/:id', (0, auth_1.authorize)('ADMIN'), (_, res) => {
    res.json({ success: true, data: { event: null } });
});
exports.default = router;
//# sourceMappingURL=eventLogs.js.map