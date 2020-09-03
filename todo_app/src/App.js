import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Fab, Typography, Modal, FormControl, Input, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import db from './firebase';
import firebase from 'firebase';
import TodosGrid from './TodosGrid';


function App() {
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');  
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [titles, setTitles] = useState([]);



  useEffect(() => {
    db.collection('titles').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setTitles(snapshot.docs.map((doc) => doc.data().title))
    });
  })


  const addTitle = () => {
    db.collection('titles').doc(title).set({
      title: title,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      title: title,
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setTodos([...todos, input]);
    setInput('');  
  }

  const clearForm = () => {
    setTitle('');
    setTodos([]);
  }


  return (
    <div className="App">
      <div className="app__header">
        <h1 className="app__headerText">
          YOURS TODOS
        </h1>
      </div>

      <div className="app__content">
        <Modal
          open={open}
          onClose={(e) => setOpen(false)}
        >
          <div className="app__addForm">
            <form>
              <FormControl className="app__formTitle">
                <Input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} onBlur={addTitle}/>
              </FormControl>
              <FormControl className="app__formTodo">
                <Input type="text" placeholder="Write a Todo" value={input} onChange={(event) => setInput(event.target.value)}/>
              </FormControl>
              <Button disabled={!title} type="submit" variant="contained" color="primary" onClick={addTodo}>Add Todo</Button>
            </form>
            <ul>
              {todos.map((todo) => (
                <li> {todo} </li>
              ))}
            </ul>
          </div>
        </Modal>

        <div className="app__addTodo">
          <Card>
            <Fab className="app__addButton" onClick={(e) => setOpen(true)} onBlur={clearForm}>
              <AddIcon />
            </Fab>
            <Typography className="app__cardText">Add Todo</Typography>
          </Card>
        </div>

        <div className="app__todosGrid">
          {titles.map((title) => 
            <TodosGrid title={title} />
          )}
        </div>
        
      </div>
    </div>
  );
}

export default App;
