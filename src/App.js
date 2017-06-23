import React, { Component } from 'react';
import './App.css';
const marked = require('marked');

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Gilbert's Markdown Previewer</h1>
        </header>
        
        <main>
          <textarea id="markdown" ></textarea>
          <div id="preview"></div>
        </main>

      </div>
    );
  }
}

console.log(marked('I am using __markdown__.'));

export default App;
