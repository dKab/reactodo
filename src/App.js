import React, { Component } from 'react';
import Progressbar from './components/progressbar/progressbar.component.js';
import Search from './components/search/search.component';
import AddItem from './components/add-item/add-item.component';
import TodoList from './components/todo-list/todo-list.component';
import TodoDetail from './components/todo-detail/todo-detail.component';
import Categorytree from './components/category-tree/category-tree.component';
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
            <div className="logo">Todo list</div>
            <Search />
        </div>
        <Progressbar progress={this.state.progress} />
          <div className="top">
              <div className="fl"><AddItem placeholder="Enter category name" /></div>
              <div className="fr"><AddItem  placeholder="Enter task name" /></div>
          </div><div className="categories-left">
              <Categorytree />
          </div><div className="todos-container">
            <div id="list-view">
                <TodoList />
            </div>
            <TodoDetail />
          </div>
      </div>
    );
  }
}

export default App;
