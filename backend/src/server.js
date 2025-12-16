import express from 'express'
import taskRouter from "./routes/tasksRoutes.js"
import { connectDB } from '../config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

// Fix __dirname cho ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }))
}

// API routes
app.use("/api/tasks", taskRouter)

// Production: serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")))

  app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  )
})
}

// Start server sau khi connect DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server chạy tại port ${PORT}`)
    })
  })
  .catch(err => {
    console.error("DB connection failed:", err)
    process.exit(1)
  })
