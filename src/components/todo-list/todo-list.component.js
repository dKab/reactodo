import React from 'react';
import {connect} from 'react-redux';
import {TodoItem} from '../todo-item/todo-item.component';
import {push, toggleTodo} from '../../actions';
import  {getVisibleCategories} from '../visible-category-tree/visible-category-tree.component.jsx';

function TodoListComponent({todos, onTodoEdit, onTodoToggle}) {
    return (
        <ul className="todo-list">
            { todos.sort((a, b) => b.id - a.id).map((todo) =>  <TodoItem key={todo.id} todo={todo} onCheck={onTodoToggle} onEdit={onTodoEdit} />) }
        </ul>);
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
        todos: visibleTodos
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onTodoEdit: (id) => dispatch(push({ ...ownProps.location, pathname: `/todo/${id}`})),
        onTodoToggle: (id) => dispatch(toggleTodo(id))
    };
};

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);