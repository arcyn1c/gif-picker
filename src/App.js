import React from 'react';

import SearchInput from './components/SearchInput';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
				<h1>GIF Picker</h1>
				<i>Search for a GIF or pick a random one from below</i>

				<SearchInput/>
      </header>
    </div>
  );
}

export default App;
