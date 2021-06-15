import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

//Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

//Routing
app.get('/',(req, res) => {
     res.send("API is running")
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


//404 handler
app.use(notFound)

//Error handler
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(
  PORT, 
  console.log(`Server running on port ${PORT}`.yellow.bold));

