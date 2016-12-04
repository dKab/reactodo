import React from 'react';
import Expand from 'react-icons/fa/angle-down';
import Edit from 'react-icons/fa/edit';
import Remove from 'react-icons/fa/trash';
import Plus from 'react-icons/fa/plus-square-o';
import Move from 'react-icons/fa/mail-reply';
import './category.css';

export default function Category(props) {
    return(
        <div className="category">
            <span className="category__expand-btn"><Expand /></span>
            {props.category.name}
            <span className="category__edit-btn"><Edit /></span>
            <div className="fr">
                <span className="category__remove-btn"><Remove /></span>
                <span className="category__add-btn"><Plus /></span>
                <button className="category__move-btn"><Move /></button>
            </div>
        </div>
    );
}