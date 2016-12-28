import React from 'react';
import Expand from 'react-icons/fa/angle-down';
import Collapse from 'react-icons/fa/angle-right';
import Edit from 'react-icons/fa/edit';
import Remove from 'react-icons/fa/trash';
import Plus from 'react-icons/fa/plus-square-o';
import Move from 'react-icons/fa/mail-reply';
import './category.css';

export default function Category(props) {
    let expandButton = null,
        isLeaf = props.isLeaf;
    if (props.category.expanded) {
        expandButton = <span className="category__expand-btn category__expand-btn--expanded"
                             onClick={() => props.onExpandClick(props.category.id)}><Collapse /></span>;
    } else if (!isLeaf) {
        expandButton = <span className="category__expand-btn"
                             onClick={() => props.onExpandClick(props.category.id)}><Expand /></span>
    }

    const innerContent = (
        <div>
            {expandButton}
            <span className="category__name">{props.category.name}</span>
            <span className="category__edit-btn"><Edit /></span>
            <div className="fr">
                <span className="category__remove-btn" onClick={() => props.onTrashClick(props.category.id)}><Remove /></span>
                <span className="category__add-btn" onClick={() => props.onPlusClick(props.category.id)}><Plus /></span>
                <button className="category__move-btn"><Move /></button>
            </div>
        </div>
    );

    return(
        (isLeaf && props.category.parentId !== null) ?
             <div className="category category--leaf"> { innerContent } </div>
             :
             <div className="category"> { innerContent }</div>
    );
}