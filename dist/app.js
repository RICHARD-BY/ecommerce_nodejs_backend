"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const AdminRoute_1 = __importDefault(require("./routes/AdminRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('MongoDB connected successfully');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.use('/api/admin', AdminRoute_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
