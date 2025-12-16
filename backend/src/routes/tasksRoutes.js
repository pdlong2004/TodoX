import express from "express"
import { deleteTasks, getAllTasks, postTasks, putTasks } from "../controllers/taskControllers.js"

const router = express.Router()

router.get("/" , getAllTasks)


router.post("/" , postTasks )

router.put("/:id" , putTasks )

router.delete("/:id" , deleteTasks )

export default router