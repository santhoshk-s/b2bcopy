import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import cors from "cors";

// Utilities 
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import messageRoute from './routes/messagesRoute.js';
import chatUserRoutes from './routes/chatuserRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = 5001;

// CORS configuration
app.use(cors({
  origin: 'https://b2b-frontendcopy.netlify.app', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
  credentials: true, // If you're sending cookies or authorization headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/auth", chatUserRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Serve static files
const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

// Start the server
const server = app.listen(port, () => console.log(`Server running on port: ${port}`));

// Configure Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: 'https://b2b-frontendcopy.netlify.app',
    credentials: true,
  },
});

global.onlineUsers = new Map();
let onlineUserIds = {};

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    onlineUserIds[userId] = true;
    io.emit("online-users", onlineUserIds);
  });

  socket.on("send-msg", async (data) => {
    const userData = await Users.findById(data.from);
    const date = new Date();
    userData.lastMessage = date;
    await userData.save();
    const allUserdata = await Users.find({}).sort({ lastMessage: -1 });
    console.log(allUserdata);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message, allUserdata);
    }
  });

  socket.on("logout", (userId) => {
    onlineUserIds[userId] = false;
    io.emit("online-users", onlineUserIds);
  });
});
