import React, { Component } from 'react';
import Progressbar from './components/progressbar/progressbar.component.js';
import Search from './components/search/search.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 50
    }

  }

  render() {
    return (
      <div className="app-container">
        <div className="clearfix">
            <div className="Logo">Todo list</div>
            <Search />
        </div>
        <Progressbar progress={this.state.progress} />
      </div>
    );
  }
}

export default App;
