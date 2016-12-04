import React from 'react';
import './todo-detail.css';

export default function TodoDetail() {
    return (
        <div className="todo-detail">
            <div className="top">
                <div className="fr">
                    <button className="todo-detail__save">Save changes</button>
                    <button>Cancel</button>
                </div>
            </div>
            <div><input type="text" defaultValue="Todo Item #1" /></div>
            <div><input type="checkbox" id="done-checkbox" /><label htmlFor="done-checkbox">Done</label></div>
            <div><textarea defaultValue="Description" className="todo-detail__description"></textarea></div>
            </div>
    );

}