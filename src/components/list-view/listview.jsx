import React from 'react';
import { ProgressBar } from '../progressbar/progressbar.component.jsx';
import {Search} from '../search/search.component.jsx';
import AddCategory from '../add-category/add-category.component';
import AddItem from '../add-item/add-item.component';
import {TodoList} from '../todo-list/todo-list.component';
import VisibleCategoryTree from '../visible-category-tree/visible-category-tree.component';
import UndoRedo from '../undo-redo/undo-redo.component';
import {AddTask} from '../add-task/add-task.component.jsx'

export class Listview extends React.Component {

    render() {
        return (
            <div>
                <div className="clearfix">
                    <div className="logo">Todo list</div>
                    <Search location={this.props.location} />
                </div>
                <ProgressBar />
                <div className="top">
                    <div className="fl"><AddCategory /></div>
                    <div className="fr"><AddTask location={this.props.location} /></div>
                </div>
                <div className="categories-left">
                    <VisibleCategoryTree location={this.props.location} />
                </div>
                <div className="todos-container">
                    <div id="list-view">
                        <TodoList location={this.props.location} />
                    </div>
                </div>
                <UndoRedo />
            </div>
            );
    }
}