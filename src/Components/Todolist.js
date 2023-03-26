import './Todolist.css'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Todolist(props) {
    const todolist = props.todolist.map((task,index) => {
      const taskComplete = task => {
        axios.put(`https://todolist-server-6yeq.onrender.com/api/tasks${task._id}` ,{
          _id : task._id,
          todo : task.todo,
          isComplete : !task.isComplete
        }).then(res => props.taskComplete(res.data)).catch(err => console.log(err))
      }
      const removeTask = id => {
        axios.delete(`https://todolist-server-6yeq.onrender.com/api/tasks/${id}`).then(res => props.removeTask(res.data)).catch(err => console.log(err))
    } 
        return <li key = {index}>
          <div> 
       <CheckIcon className= {task.isComplete ? 'isComplete' : 'checkicon'}/>
       <p className = {task.isComplete ? 'isComplete' : '' } onClick = {() => {
        taskComplete(task)
       }}> {task.todo} </p>
          </div>
          <div>
          <EditIcon className = 'edit' onClick = {() => {
                    props.tasktoUpdate(task)
                    props.showPopup()
                }}/>
           <CloseIcon className = 'close' onClick = {() => {
                    removeTask(task._id)
                }}/>
          </div>
        </li>
    })
  return (
    <div className='tasklist'>
        <ul>
            {todolist}
        </ul>
        
    </div>
  )
}

export default Todolist
