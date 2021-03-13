import React from 'react';
import Navbar from './components/Navbar'
import Calendar from './components/Calendar'

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar account=""/> 
      <Calendar />
    </div>
  );
}

export default App;
