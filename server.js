import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// App config

const app = express();
dotenv.config();
connectDb();
connectCloudinary();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => res.send("Api Working "));

app.listen(port, () => console.log("SERVER IS RUNNING ON " + port));
