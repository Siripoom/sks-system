"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const client_1 = require("@prisma/client");
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const schools_1 = __importDefault(require("./routes/schools"));
const vehicles_1 = __importDefault(require("./routes/vehicles"));
const drivers_1 = __importDefault(require("./routes/drivers"));
const students_1 = __importDefault(require("./routes/students"));
const guardians_1 = __importDefault(require("./routes/guardians"));
const routes_1 = __importDefault(require("./routes/routes"));
const stops_1 = __importDefault(require("./routes/stops"));
const trips_1 = __importDefault(require("./routes/trips"));
const assignments_1 = __importDefault(require("./routes/assignments"));
const eventLogs_1 = __importDefault(require("./routes/eventLogs"));
dotenv_1.default.config();
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001'],
        methods: ['GET', 'POST'],
    },
});
const PORT = process.env.PORT || 3000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(limiter);
app.use((0, morgan_1.default)('combined'));
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001'],
    credentials: true,
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/schools', schools_1.default);
app.use('/api/vehicles', vehicles_1.default);
app.use('/api/drivers', drivers_1.default);
app.use('/api/students', students_1.default);
app.use('/api/guardians', guardians_1.default);
app.use('/api/routes', routes_1.default);
app.use('/api/stops', stops_1.default);
app.use('/api/trips', trips_1.default);
app.use('/api/assignments', assignments_1.default);
app.use('/api/events', eventLogs_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.on('join-trip', (tripId) => {
        socket.join(`trip-${tripId}`);
        console.log(`User ${socket.id} joined trip ${tripId}`);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
async function startServer() {
    try {
        await exports.prisma.$connect();
        console.log('Database connected successfully');
        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await exports.prisma.$disconnect();
    process.exit(0);
});
startServer();
//# sourceMappingURL=index.js.map