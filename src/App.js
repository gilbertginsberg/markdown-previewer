import React, { Component } from 'react';
import './App.css';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

function Markdown(props) {
  return (
    <textarea id="markdown" onInput={props.onInput}>
    </textarea>
  );
}

function Preview (props) {
  return (
    <div id="preview">
      {props.showHTML}
    </div>
  );
}

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: '',
    };
    this.handleMarkdown = this.handleMarkdown.bind(this);
  }

    handleMarkdown(e) {
      const text = e.target.value;
      let html = this.state.html.slice;

      marked(text, function (err, content) {
        if (err) {
          throw err;
        } 
        html = content;
      });
      this.setState({
          html: html,
        });
    }

  render() {
    return (
      <main>
        <Markdown onInput={this.handleMarkdown}/>
        <Preview showHTML={this.state.html}/>
      </main>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Gilbert's Markdown Previewer</h1>
        </header>
        <Type />
      </div>
    );
  }
}

export default App;

