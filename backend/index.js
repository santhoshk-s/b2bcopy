import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"; // Updated import

// Utilities 
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import  messageRoute from './routes/messagesRoute.js';
import ChatuserRouts from './routes/chatuserRoutes.js'
dotenv.config();
const port = 5001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/auth", ChatuserRouts);
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname, "/uploads")));

const server = app.listen(port, () => console.log(`Server running on port: ${port}`));

// Use Server instead of socket
const io = new Server(server, {
  cors: {
    // origin: SERVER_URL,
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
