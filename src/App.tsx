import React, { useState } from 'react';
import './App.css';
import Repos from './Components/Repos';

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("jeremylshepherd");  
  const handleSubmit = (e : any) => {
    e.preventDefault();
    setUsername(name);
    setName("");
  }
  return (
    <div className="App">
      <form className="App-form" onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="User's name" value={name} onChange={e=> setName(e.target.value)} />
        <input name="button" type="submit" value="Submit" />
      </form>
      <Repos username={username} width={600}/>
    </div>
  );
}

export default App;
