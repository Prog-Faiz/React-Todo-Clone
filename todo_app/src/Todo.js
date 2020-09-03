import React, { useState } from 'react';
import { List, ListItemText, ListItemIcon, Modal, FormControl, Input, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';


function Todo({ tid, todo }) {
    const [close, setClose] = useState(false);
    const [updateInput, setUpdateInput] = useState('');
    

    const updateTodo = (event) => {
        event.preventDefault();

        db.collection("todos").doc(tid).update({
            todo: updateInput
        });

        setUpdateInput('');
        setClose(false);
    }

    const deleteTodo = () => {
        db.collection("todos").doc(tid).delete();
    }


    return (
        <div>
            <Modal
                open={close}
                onClose={e => setClose(false)}
            >
                <div className="todosGrid__editTodo">
                    <form>
                        <FormControl>
                            <Input type="text" value={updateInput} onChange={(event) => setUpdateInput(event.target.value)}/>
                        </FormControl>
                        <Button disabled={!updateInput} type="submit" variant="contained" color="primary" onClick={updateTodo}>Update Todo</Button>
                    </form>
                </div>
            </Modal>
            <List key={tid} className="todosGrid__todoList">
                <ListItemText primary={todo} style={{color: "#132942"}}/>
                <ListItemIcon>
                    <EditIcon variant="contained" style={{color: "#364f6b"}} onClick={e => setClose(true)}/>
                    <DeleteForeverIcon variant="contained" style={{color: "#364f6b"}} onClick={deleteTodo}/>
                </ListItemIcon>
            </List>
        </div>
    )
}

export default Todo;
