import React from 'react';
import './todo-item.css';

export default function TodoItem() {

    return (
        <div className="todo-item">
            <input title="done" className="todo-item__done-check"  type="checkbox"  />
            <span className="todo-item__title">Todo item #1</span>
            <button className="todo-item__edit-btn">edit</button>
        </div>)
}