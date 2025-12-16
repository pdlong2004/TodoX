import express from 'express'
import taskRouter from "./routes/tasksRoutes.js"
import { connectDB } from '../config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express ()

// middleware
app.use(express.json())
app.use(cors({origin : 'http://localhost:5173'}))

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5001

app.use("/api/tasks" , taskRouter)

connectDB().then(() => {
    app.listen(PORT , () => {
        console.log(`server chay tren cong ${PORT}`)
    })
})
