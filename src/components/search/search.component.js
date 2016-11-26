import React from 'react';
import './search.css';

export default function Search(props) {
    return (<div className="search">
        <label><input checked={props.filterActive} type="checkbox"/> Show active</label>
        <input placeholder="Search" type="text" className="search__input" /><span className="search__clear">&times;</span>
    </div>);
}