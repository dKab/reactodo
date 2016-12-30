import React from 'react';
import Collapse from 'react-icons/fa/angle-down';
import Expand from 'react-icons/fa/angle-right';
import Edit from 'react-icons/fa/edit';
import Remove from 'react-icons/fa/trash';
import Plus from 'react-icons/fa/plus-square-o';
import Move from 'react-icons/fa/mail-reply';
import './category.css';

export const LIST_MODE = 'LIST_MODE';
export const DETAIL_MODE = 'DETAIL_MODE';

export function Category(props) {

    let expandButton = null,
        isLeaf = props.isLeaf;
    if (props.category.expanded) {
        expandButton = <span className="category__expand-btn category__expand-btn--expanded"
                             onClick={(e) => props.onExpandClick(props.category.id, e)}><Collapse /></span>;
    } else if (!isLeaf) {
        expandButton = <span className="category__expand-btn"
                             onClick={(e) => props.onExpandClick(props.category.id, e)}><Expand /></span>
    }
    const classes = ['category'];
    if (isLeaf && props.category.parentId !== null) {
        classes.push('category--leaf');
    }
    if (props.category.selected) {
        classes.push('category--selected');
    }

    return (
        <div className={classes.join(' ')} onClick={() => props.onCategoryClick(props.category.id)}>
            {expandButton}
                <span className="category__name">{props.category.name}</span>
                <span className="category__edit-btn btn" onClick={(e) => props.onEditClick(props.category.id, e)}><Edit /></span>
                <div className="fr">
                    {props.mode === LIST_MODE &&
                    (<div><span className="category__remove-btn btn"
                                onClick={(e) => props.onTrashClick(props.category.id, e)}><Remove /></span>
                        <span className="category__add-btn btn"
                              onClick={(e) => props.onPlusClick(props.category.id, e)}><Plus /></span></div>)}
                    {props.mode === DETAIL_MODE && <button className="category__move-btn btn"><Move /></button>}
                </div>
        </div>
    );
}