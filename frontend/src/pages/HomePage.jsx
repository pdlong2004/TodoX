import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StartsAndFilters from '@/components/StartsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axois'
import { visibleTaskLimit } from './../lib/data';

const HomePage = () => {

  const [taskBuffer , setTaskBuffer] = useState([])
  const [activeTaskCount , setactiveTaskCount] = useState(0)
  const [completeTaskCount , setcompleteTaskCount] = useState(0)
  const [filter , setFilter] = useState("all")
  const [dateQuery , setDateQuery] = useState("today")
  const [page , setPage] = useState(1)

  useEffect(() =>{
    fetchTasks()
  },[dateQuery])

  useEffect(() => {
    setPage(1)
  },[filter , dateQuery])

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`)
      setTaskBuffer(res.data.tasks)
      setactiveTaskCount(res.data.activeCount)
      setcompleteTaskCount(res.data.completeCount)

    } catch (error) {
      console.error("Loi xay ra khi truy van task : " , error)
      toast.error("Loi xay ra khi truy van task ")
    }
  }

  const handleTaskChange = () => {
    fetchTasks()
  }
  
  const handleNextPage = () => {
    if(page < totalPage ){
      setPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if(page > 1){
      setPage((prev) => prev - 1)
    }
  }

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }
  
  const filteredTasks = taskBuffer.filter((task) => {
    switch(filter){
      case "active" : 
      return task.status === 'active' 
      case "completed" :
        return task.status === 'complete'
        default : 
        return true
      }
    })
    
    const visibleTasks = filteredTasks.slice((page - 1 )*visibleTaskLimit , page*visibleTaskLimit)

    if(visibleTasks.length === 0){
      handlePrevPage()
    }
    const totalPage = Math.ceil(filteredTasks.length / visibleTaskLimit)


    return (
      
    <div className="min-h-screen w-full bg-[#fefcff] relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
              radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
          }}
        />
          {/* Your Content/Components */}
          <div className='container pt-8 mx-auto relative z-10'>
            <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
              {/* Đầu trang */}
              <Header />

              {/* Tao nhiem vu */}
              <AddTask 
                handleNewTaskAddded = {handleTaskChange}
              />

              {/* Thong ke va bo loc */}
              <StartsAndFilters 
                filter = {filter}
                setFilter ={setFilter}
                activeTaskCount={activeTaskCount}
                completedTaskCount={completeTaskCount}
              />


              {/* Danh sach nhiem vu */}
              <TaskList 
                filteredTasks={visibleTasks} 
                filter={filter}
                handleTaskChange = {handleTaskChange}
              />

              {/* Phan trang va loc theo date */}
              <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                <TaskListPagination
                  handleChangePage={handleChangePage}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  page={page}
                  totalPage={totalPage}
                />
                <DateTimeFilter
                  dateQuery={dateQuery}
                  setDateQuery={setDateQuery}                 
                />
              </div>

              {/* Chan trang */}
              <Footer 
                activeTaskCount={activeTaskCount}
                completeTaskCount={completeTaskCount}
              />
            </div>
          </div>
      </div>
  )
}

export default HomePage