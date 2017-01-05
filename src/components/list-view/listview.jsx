import React from 'react';
import Progressbar from '../progressbar/progressbar.component.js';
import {Search} from '../search/search.component.jsx';
import AddCategory from '../add-category/add-category.component';
import AddItem from '../add-item/add-item.component';
import TodoList from '../todo-list/todo-list.component';
import VisibleCategoryTree from '../visible-category-tree/visible-category-tree.component';
import UndoRedo from '../undo-redo/undo-redo.component';

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
                    <Search location={this.props.location} />
                </div>
                <Progressbar progress={this.state.progress}/>
                <div className="top">
                    <div className="fl"><AddCategory /></div>
                    <div className="fr"><AddItem placeholder="Enter task name"/></div>
                </div>
                {this.props.children}
                <div className="categories-left">
                    <VisibleCategoryTree location={this.props.location} />
                </div>
                <div className="todos-container">
                    <div id="list-view">
                        <TodoList />
                    </div>
                </div>
                <UndoRedo />
            </div>
            );
    }
}