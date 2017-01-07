import React from 'react';
import {TodoItem} from '../todo-item/todo-item.component';

export function TodoList({todos, onTodoEdit, onTodoToggle}) {
    return (
        <ul className="todo-list">
            { todos.sort((a, b) => b.id - a.id).map((todo) =>  <TodoItem key={todo.id} todo={todo} onCheck={onTodoToggle} onEdit={onTodoEdit} />) }
        </ul>);
}