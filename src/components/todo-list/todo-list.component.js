import React from 'react';
import TodoItem from '../todo-item/todo-item.component';

export default function TodoList() {
    return (<ul className="todo-list">
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
    </ul>);
}