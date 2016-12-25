import React from 'react';
import Progressbar from '../progressbar/progressbar.component.js';
import Search from '../search/search.component';
import AddCategory from '../add-category/add-category.component';
import AddItem from '../add-item/add-item.component';
import TodoList from '../todo-list/todo-list.component';
import VisibleCategoryTree from '../visible-category-tree/visible-category-tree.component';

export class Listview extends React.Component {

    constructor() {
        super();
        this.state = {
            progress: 50
        };
    }

    render() {
        return (
            <div>
                <div className="clearfix">
                    <div className="logo">Todo list</div>
                    <Search />
                </div>
                <Progressbar progress={this.state.progress}/>
                <div className="top">
                    <div className="fl"><AddCategory /></div>
                    <div className="fr"><AddItem placeholder="Enter task name"/></div>
                </div>
                {this.props.children}
                <div className="categories-left">
                    <VisibleCategoryTree />
                </div>
                <div className="todos-container">
                    <div id="list-view">
                        <TodoList />
                    </div>
                </div>
            </div>
            );
    }
}