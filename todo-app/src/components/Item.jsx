import { ListItemText, ListItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import '../App.css'
import db from '../firebase';

function Item(props) {
    // console.log(props);
    return (
        <ListItem className='items'>
            <ListItemText primary={props.todoObject.todoName} />
            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => db.collection('todosDB').doc(props.todoObject.id).delete()}></DeleteIcon>
        </ListItem>

    );
}

export default Item;