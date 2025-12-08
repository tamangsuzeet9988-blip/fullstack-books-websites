import express from "express";
import cors from "cors";
import path from "path";

import booksRoute from "./routes/books";
import cartRoute from "./routes/cart";
import ordersRoute from "./routes/orders";
import authRoute from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.json());

// ⭐ IMPORTANT: Serve images from /public/images
app.use("/images", express.static(path.join(__dirname, "..", "public", "images")));

// Routes
app.use("/api/books", booksRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/auth", authRoute);

export default app;
