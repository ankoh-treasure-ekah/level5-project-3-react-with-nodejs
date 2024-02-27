import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/navbar'
import './editTodo.scss'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import { DatePicker } from '@mui/x-date-pickers'



const EditTodo = () => {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [expectedDate, setExpectedDate] = useState(dayjs(''));
    const [priority, setPriority] = useState('');


    useEffect(() => {
        document.title = 'Edit Todo'
        fetch('http://localhost:8000/api/tasks/find/' + id, {
            method: 'GET',

        }).then(response => {
            return response.json().then(data => {
                console.log(data.data);
                setTitle(data.data.title);
                setDescription(data.data.description);
                setStatus(data.data.status);
                setExpectedDate(dayjs(data.data.expectedDate));
                setPriority(data.data.priority);
            })
        }).catch(err => {
            console.log(err)
        });

    }, []);

    const navigate = useNavigate();


    const priorities = [
        {
            label: 'normal',
            value: 'normal',
        },
        {
            label: 'important',
            value: 'important',
        },
        {
            label: 'very important',
            value: 'very important',
        },
        {
            label: 'super important',
            value: 'super important',
        }
    ]

    const statuses = [
        {
            label: 'active',
            value: 'active',
        },
        {
            label: 'completed',
            value: 'completed',
        },
        {
            label: 'pending',
            value: 'pending',
        },
        {
            label: 'overdue',
            value: 'overdue',
        }
    ]


    const handleSubmit = async (e) => {
        e.preventDefault();
        const contacts = await fetch('http://localhost:8000/api/tasks/update/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                status: status,
                expectedDate: expectedDate,
                priority: priority
            })
        }).then(response => {
            if (response.ok) {
                console.log(response);
                return response.json().then(res => {
                    console.log(res);
                    if(res.status == 'Ok') {
                        navigate('/tasks');
                    }
                })
            } else {
                throw new Error(response.statusText);
            }
        }).catch(response => {
            console.log(response);
        });
    }



    return (

        <React.Fragment>
            <Navbar />

            <div className="container">
                <div className="row">

                    <div id="form-header" className="col-12">
                        <h1 id="title">edit Contact</h1>
                    </div>
                </div>

                <div className="row">
                    <div id="form-tagline" className="col-md-4">
                        <div className="form-tagline">
                            <i className="fa fa-envelope fa-5x"></i>
                            <h2>How Are We Doing?</h2>
                            <p id="description" className="lead">Create your contacts</p>
                        </div>
                    </div>

                    <div id="form-content" className="col-md-8">

                        <form id="survey-form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="row form-group">

                                <div className="input-group col-sm-9">

                                    <TextField
                                        InputProps={{
                                            endAdornment: (<InputAdornment position='end'><TitleIcon /></InputAdornment>),
                                        }}
                                        onChange={(e) => setTitle(e.target.value)}
                                        // onChange={(e) => setFirstName(e.target.value)} 
                                        // onFocus={(e) => focusCheck(e)}

                                        required
                                        id="outlined-basic"
                                        label="Title"
                                        variant="filled"
                                        style={{ width: '90%' }}
                                        value={title}
                                    />
                                </div>
                            </div>
                            <div className="row form-group">


                                <div className="input-group col-sm-9">

                                    <TextField
                                        InputProps={{
                                            endAdornment: (<InputAdornment position='end'><DescriptionIcon /></InputAdornment>),
                                        }}
                                        onChange={(e) => setDescription(e.target.value)}

                                        required
                                        multiline
                                        minRows={5}
                                        maxRows={5}
                                        id="outlined-basic"
                                        label="description"
                                        variant="filled"
                                        style={{ width: '90%' }}
                                        value={description}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">


                                <div className="input-group col-sm-9">


                                    <TextField
                                        InputProps={{
                                            endAdornment: (<InputAdornment position='end'><AutorenewIcon /></InputAdornment>),
                                        }}
                                        onChange={(e) => setStatus(e.target.value)}
                                        select
                                        required
                                        id="outlined-basic"
                                        label="status"
                                        variant="filled"
                                        style={{ width: '90%' }}
                                        value={status}
                                    >
                                        {statuses.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>

                            <div className="form-group row">

                                <div className="input-group col-sm-9">

                                    <DatePicker
                                        sx={{ width: '90%' }}
                                        required
                                        label="expectedDate"
                                        value={expectedDate}
                                        onChange={(e) => setExpectedDate(e)}
                                        slotProps={{
                                            textField: {
                                                variant: 'filled',

                                            }
                                        }}
                                    />

                                </div>
                            </div>



                            <div className="form-group row">

                                <div className="input-group col-sm-9">

                                    <TextField
                                        InputProps={{
                                            endAdornment: (<InputAdornment position='end'><LowPriorityIcon /></InputAdornment>),
                                        }}
                                        onChange={(e) => setPriority(e.target.value)}
                                        select
                                        required
                                        id="outlined-basic"
                                        label="priority"
                                        variant="filled"
                                        style={{ width: '90%' }}
                                        value={priority}
                                    >
                                        {priorities.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-12 submit-button">
                                    <button type="submit" id="submit" className="btn btn-default" aria-pressed="true">Submit Contact</button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default EditTodo
