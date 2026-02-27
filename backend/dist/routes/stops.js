"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', (_, res) => {
    res.json({ success: true, data: { stops: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } } });
});
router.get('/:id', (_, res) => {
    res.json({ success: true, data: { stop: null } });
});
router.post('/', (0, auth_1.authorize)('ADMIN', 'TEACHER'), (_, res) => {
    res.json({ success: true, data: { stop: null } });
});
router.put('/:id', (0, auth_1.authorize)('ADMIN', 'TEACHER'), (_, res) => {
    res.json({ success: true, data: { stop: null } });
});
router.delete('/:id', (0, auth_1.authorize)('ADMIN'), (_, res) => {
    res.json({ success: true, message: 'Stop deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=stops.js.map