import React from 'react';
import Expand from 'react-icons/fa/angle-down';
import Edit from 'react-icons/fa/edit';
import Remove from 'react-icons/fa/trash';
import Plus from 'react-icons/fa/plus-square-o';
import './category.css';

export default function Category(props) {
    return(
        <div classname="category">
            <span className="category__expand-btn"><Expand /></span>
            {props.category.name}
            <span className="category__edit-btn"><Edit /></span>
            <span className="category__remove-btn"><Remove /></span>
            <span className="category__add-btn"><Plus /></span>
        </div>
    );
}