"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.get('/', (0, auth_1.authorize)('ADMIN', 'TEACHER'), (_, res) => {
    res.json({ success: true, data: { drivers: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } } });
});
router.get('/:id', (_, res) => {
    res.json({ success: true, data: { driver: null } });
});
router.post('/', (0, auth_1.authorize)('ADMIN'), (_, res) => {
    res.json({ success: true, data: { driver: null } });
});
router.put('/:id', (0, auth_1.authorize)('ADMIN'), (_, res) => {
    res.json({ success: true, data: { driver: null } });
});
router.delete('/:id', (0, auth_1.authorize)('ADMIN'), (_, res) => {
    res.json({ success: true, message: 'Driver deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=drivers.js.map