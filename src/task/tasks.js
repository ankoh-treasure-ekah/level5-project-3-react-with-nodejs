import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Navbar from '../navbar/navbar'
import { TextField } from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import dayjs from 'dayjs'

const Tasks = () => {
  const [filter, setFilter] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/tasks/find', {
      method: 'Get',
      
    }).then(response => {
      console.log(response.body);
      return response.json().then(res => {
        console.log(res);
        setTasks(res.data);
      })
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filter);
    fetch('http://localhost:8000/api/tasks/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: filter
      })
    }).then(response => {
      return response.json().then(res => {
        console.log(res);
        setTasks(res.data);
      })
    }).catch(error => {
      console.log(error);
    });
  };

  const deleteTask = (id) => {
    setTasks((task) => {
      return task.filter((task) => task._id!== id);
    });
    console.log(tasks);


    fetch('http://localhost:8000/api/tasks/delete/' + id, {
      method: 'GET',
      
    }).then(response => {
      return response.json().then(res => {
        console.log(res);
      })
    }).catch(error => {
      console.log(error);
    });
  }

  const filterList = [
    {
      value: 'all',
      label: 'All'
    },
    {
      value: 'active',
      label: 'Active'
    },
    {
      value: 'completed',
      label: 'Completed'
    },
    {
      value: 'pending',
      label: 'Pending'
    },
    {
      value: 'overdue',
      label: 'Overdue'
    }
  ]

  return (
    <React.Fragment>
      <Navbar />

      <h1 className="text-center pt-4">Tasks</h1>
      <div className="container table-responsive py-5">
        <div className="add" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant='contained'><Link style={{ color: 'white', textDecoration: 'none' }} to='/tasks/add-task'>Add Task</Link></Button>

          <form onSubmit={(e) => {handleSubmit(e)}} style={{display: 'flex'}}>
            <TextField
             
              onChange={(e) => setFilter(e.target.value)}
              select
              required
              id="outlined-basic"
              label="filter"
              variant="filled"
              style={{ width: '8rem' }}
              value={filter}
            >
              {filterList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button type='submit' style={{ marginLeft: '1rem' }} variant='contained'>filter</Button>

          </form>
        </div>
        <hr />
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">title</th>
              <th scope="col">description</th>
              <th scope="col">status</th>
              <th scope="col">expectedDate</th>
              <th scope="col">priority</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td style={{maxWidth: '10rem', wordWrap: 'break-word'}}>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{dayjs(task.expectedDate).format('MM/DD/YYYY')}</td>
                  <td>{task.priority}</td>
                  <td>
                    <Link style={{ textDecoration: 'none' }} to={`/tasks/edit-task/${task._id}`}>Edit</Link> | <Button onClick={() => {deleteTask(task._id)}}>Delete</Button>
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default Tasks
