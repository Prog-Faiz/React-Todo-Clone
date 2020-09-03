import React, { useState, useEffect } from 'react';
import {Modal, Card, Typography, CardContent, CardActions, FormControl, Input, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import firebase from 'firebase';
import './TodosGrid.css';
import Todo from './Todo';


function TodosGrid({ title }) {
    const [delIds, setDelIds] = useState([]);
    const [open, setOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    


    useEffect(() => {        
        db.collection('todos')
        .where('title', '==', title)
        .onSnapshot((snapshot) => {
            setDelIds(snapshot.docs.map((doc) => doc.id))
            setTodos(snapshot.docs.map((doc) => ({id: doc.id, todo: doc.data().todo})))
        });
    }, [title, todos]);

    
    const addTodo = (event) => {
        event.preventDefault();

        db.collection('todos').add({
            title: title,
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    }

    const deleteCard = () => {
        db.collection('titles').doc(title).delete();
        delIds.map((id) => 
            db.collection('todos').doc(id).delete()
        )
    };


    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className="todosGrid__cardEdit">
                    <form>
                        <FormControl className="todosGrid__formTodo">
                            <Input type="text" placeholder="Write a Todo" value={input}onChange={(event) => setInput(event.target.value)}/>
                        </FormControl>
                        <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}>Add Todo</Button>
                    </form>
                    {todos.map(({ id, todo }) => (
                        <Todo key={id} tid={id} todo={todo} />
                    ))}
                </div>
            </Modal>
            <Card className="todosGrid__todoCard">
                <CardContent className="todosGrid__title">
                    <Typography>
                        {title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <EditIcon variant="contained" style={{color: "#364f6b"}} onClick={e => setOpen(true)}/>
                    <DeleteForeverIcon variant="contained" style={{color: "#364f6b"}} onClick={deleteCard}/>
                </CardActions>
            </Card>    
        </>
    )
}

export default TodosGrid;
