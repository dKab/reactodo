import React from 'react';
import './todo-item.css';

export function TodoItem({todo, onCheck, onEdit}) {

    return (
        <li className="todo-item">
            <input title="done" className="todo-item__done-check" onChange={() => onCheck(todo.id)} type="checkbox" checked={todo.done} />
            <span className="todo-item__title">{todo.name}</span>
            <span className="fa fa-edit todo-item__edit-btn" style={{marginTop: '12px'}} onClick={() => onEdit(todo.id)} />
        </li>)
}