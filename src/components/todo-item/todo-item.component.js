import React from 'react';
import Edit from 'react-icons/fa/edit';
import './todo-item.css';

export function TodoItem({todo, onCheck, onEdit}) {

    return (
        <li className="todo-item">
            <input title="done" className="todo-item__done-check" onChange={() => onCheck(todo.id)} type="checkbox" checked={todo.done} />
            <span className="todo-item__title">{todo.name}</span>
            <button className="todo-item__edit-btn"><Edit onClick={() => onEdit(todo.id)} /></button>
        </li>)
}