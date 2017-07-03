import React, { Component } from 'react';
import './App.css';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

function Markdown(props) {
  return (
    <textarea id="markdown" value={props.value} onChange={props.onChange} onLoad={() => props.onLoad}>
 
    </textarea>
  );
}

function Preview(props) {
  
  return (
    <div id="preview">
      <div>

      </div>
    </div>
  );
}

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Hola \n===\n \n* Un mango \n* Dos bananas \n* Tres arepas\n \n### Almond butter\n \n**Be bold.**\n \n*crazy run*\n \n`code everyday`',
      html: '', 
    };
    this.handleMarkdown = this.handleMarkdown.bind(this);
  }


    renderPreview(markdown) {
      const preview = document.getElementById('preview');
      const firstChild = preview.firstChild;
      console.log(firstChild);
      const html = document.createRange().createContextualFragment(markdown);

      const div = document.createElement('div');
      div.appendChild(html);
      preview.replaceChild(div, firstChild);
    }

    componentDidMount() {
      const text = this.state.value.slice();
      let md = '';

      marked(text, function (err, content) {
        if (err) {
          throw err;
        } 
        md = content; 
      });
      this.renderPreview(md);
    }
   
    handleMarkdown(e) {
      let text = e.target.value;
      let html = this.state.html.slice();

      marked(text, function (err, content) {
        if (err) {
          throw err;
        } 
        html = content;
      });
      this.setState({
          html: html,
          value: e.target.value,
        }, () => this.renderPreview(this.state.html)); 
    }

  render() {
    return (
      <main>
        <Markdown onChange={this.handleMarkdown} value={this.state.value} />
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