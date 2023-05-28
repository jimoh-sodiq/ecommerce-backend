import express from "express";
import connectDB from './src/db/connect.js';
import "express-async-errors"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('e-commerce api')
})

const port = process.env.PORT || 5000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start()