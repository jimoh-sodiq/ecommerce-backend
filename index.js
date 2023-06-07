import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./src/db/connect.js";
import notFoundMiddleware from "./src/middlewares/not-found.js";
import errorHandlerMiddleware from "./src/middlewares/error-handler.js";
import authRouter from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("e-commerce api");
});

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.send("cookie route");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

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
