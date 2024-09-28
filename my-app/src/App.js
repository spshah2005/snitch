import React from 'react';
import './App.css';

import DeadlineDisplay from './components/DeadlineDisplay'
import FriendsDisplay from './components/FriendsDisplay'
import ClassesDisplay from './components/ClassesDisplay'

function App() {
  return (
    <div className="App">
      <DeadlineDisplay />
      <FriendsDisplay />
      <ClassesDisplay />
    </div>
  );
}

export default App;