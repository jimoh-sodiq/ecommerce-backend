import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./src/db/connect.js";
import notFoundMiddleware from "./src/middlewares/not-found.js";
import errorHandlerMiddleware from "./src/middlewares/error-handler.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import reviewRouter from "./src/routes/reviewRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import fileUpload from "express-fileupload"
import rateLimiter from "express-rate-limit"
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";



dotenv.config();

const app = express();

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet())
app.use(mongoSanitize())


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors())
app.use(express.static("./public"))

app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4173;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
