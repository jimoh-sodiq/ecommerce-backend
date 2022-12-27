import express, { response } from 'express';
import dotenv from 'dotenv' 
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './db/connect.js';
import errorHandler from './middlewares/error-handler.js';
import notFound from './middlewares/not-found.js';
import postRoutes from './routes/posts.js'

dotenv.config()
const app = express();
app.use(cors())

app.use(express.json())
app.get('/api/v1', (req, res) => {
    return res.send('This is the homepage of the api')
})
app.use('/api/v1/posts', postRoutes )

app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('Server is listening on port ' + port)
        })
    } catch (err) {
        console.log(err)
    }
}
mongoose.set('strictQuery', false) // to avoid console warnings and prepare for mongoose 7

start()