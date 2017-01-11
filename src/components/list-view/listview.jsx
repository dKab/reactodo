import React from 'react';
import { ProgressBar } from '../progressbar/progressbar.component.jsx';
import {Search} from '../search/search.component.jsx';
import AddCategory from '../add-category/add-category.component';
import AddItem from '../add-item/add-item.component';
import {TodoList} from '../todo-list/todo-list.component';
import {VisibleCategoryTree, getVisibleCategories} from '../visible-category-tree/visible-category-tree.component';
import UndoRedo from '../undo-redo/undo-redo.component';
import {AddTask} from '../add-task/add-task.component.jsx';
import {push, toggleTodo} from '../../actions';
import {connect} from 'react-redux';

function ListviewComponent({location, todos, onTodoEdit, onTodoToggle}) {
        return (
            <div className="list-view">
                <div className="clearfix">
                    <div className="logo">Todo list</div>
                    <Search location={location} />
                </div>
                <ProgressBar />
                <div className="top">
                    <div className="fl"><AddCategory /></div>
                    <div className="fr"><AddTask location={location} /></div>
                </div>
                <div className="categories-left">
                    <VisibleCategoryTree location={location} />
                </div>
                <div className="todos-container">
                    <div id="list-view">
                        <TodoList todos={todos} onTodoEdit={onTodoEdit} onTodoToggle={onTodoToggle} />
                    </div>
                </div>
                <UndoRedo />
            </div>
        );
}

const mapStateToProps = (state, ownProps) => {
    const categoryId = +ownProps.location.query.category;
    const visibleCategories = getVisibleCategories(state.present.categories, ownProps.location.query.searchPhrase, ownProps.location.query.showDone, state.present.todos);
    let visibleTodos;
    if (!visibleCategories.some((cat) => cat.id === categoryId)) {
        visibleTodos = [];
    } else {
        visibleTodos = state.present.todos.filter((todo) => todo.categoryId === categoryId )
    }
    return {
        todos: visibleTodos,
        location: ownProps.location
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTodoEdit: (id) => dispatch(push({ ...ownProps.location, pathname: `/todo/${id}`})),
        onTodoToggle: (id) => dispatch(toggleTodo(id))
    };
};

export const ListView = connect(mapStateToProps, mapDispatchToProps)(ListviewComponent);

