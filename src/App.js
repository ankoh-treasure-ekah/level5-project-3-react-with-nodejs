
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Homepage from './homepage/homepage';
import Tasks from './task/tasks';
import AddTodo from './todo/add/addTodo';
import EditTodo from './todo/edit/editTodo';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Homepage} />
        <Route path='/tasks' Component={Tasks} >
        </Route>
        <Route path='tasks/add-task' Component={AddTodo} />
        <Route path='tasks/edit-task/:id' Component={EditTodo} />
      </Routes>
    </Router>
  )
}

export default App;
