import { useEffect, useState } from 'react';
import Item from './components/Item';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  //to fetch the database from firebase everytime we load the page
  useEffect(() => {
    db.collection('todosDB').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todoName: doc.data().todoName})));
      // console.log( snapshot.docs.map(doc => doc.data().todoName));
    })
  }, [])
  function handleChange(e) {
    setInput(e.target.value);
  };

  function handleClick(e) {
    setTodos([...todos, input]);
    setInput('');
    db.collection('todosDB').add({
      todoName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    e.preventDefault();
  }


  return (
    <div className="App">
      <h1>To Do App</h1>

      <form autoComplete="off" onSubmit={handleClick}>
        <FormControl>
          <InputLabel>✅ Write a todo</InputLabel>
          <Input name="itemName" onChange={handleChange} value={input} />
        </FormControl>
        <Button disabled={!input} variant='contained' color='primary' onClick={handleClick} >Add Todo</Button>
      </form>

      <ul >
        {todos.map((todo, index) => {
          return <Item todoObject={todo} key={index}></Item>
        })}
      </ul>

    </div>
  );
}

export default App;

<form >

</form>