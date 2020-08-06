import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './component/button/button';
import Avatar from './component/avatar/avatar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          Learn Material UI
      </header>
      <Button primary="true">Button</Button>
      <Avatar 
        size="48px"
        image="https://placehold.jp/150x150.png"
      />
    </div>
  );
}

export default App;
