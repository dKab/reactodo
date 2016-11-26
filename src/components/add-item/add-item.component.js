import React from 'react';

export default function AddItem(props) {
    return (
        <div className="add-item">
            <input className="add-item__input" placeholder={props.placeholder} type="text"/>
            <button className="add-item__button">Add</button>
        </div>
    );
}