import React from 'react';
import './category.css';
import Portal from 'react-modal';
import {DeleteCategoryModal} from '../delete-category-modal/delete-category-modal.component';
import {AddCategoryModal} from '../add-category-modal/add-category-modal.component';
import {ChangeCategoryNameModal} from '../change-category-name-modal/change-category-name-modal.component';
import {modalStyles} from '../modal/modal.component.jsx';

export const LIST_MODE = 'LIST_MODE';
export const DETAIL_MODE = 'DETAIL_MODE';
const ADD_MODAL = 'ADD_MODAL';
const DELETE_MODAL = 'DELETE_MODAL';
const EDIT_MODAL = 'EDIT_MODAL';

export class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            [ADD_MODAL]: false,
            [ADD_MODAL]: false,
            [EDIT_MODAL]: false
        };
    }

    showModal(e, modal) {
        this.setState({...this.state, [modal]: true});
        e.stopPropagation();
    }

    confirmAddAndHideModal(name) {
        this.props.onPlusClick(name, this.props.category.id);
        this.hideModal(ADD_MODAL);
    }

    confirmDeleteAndHideModal() {
        this.props.onTrashClick(this.props.category.id);
        this.hideModal(DELETE_MODAL);
    }

    confirmEditAndHideModal(name) {
        this.props.onEditClick(this.props.category.id, name);
        this.hideModal(EDIT_MODAL);
    }

    hideModal(modal) {
        this.setState({...this.state, [modal]: false});
    }

    render() {
        let expandButton = null,
            isLeaf = this.props.isLeaf;
        if (this.props.category.expanded) {
            expandButton = <span className="category__expand-btn category__expand-btn--expanded"
                                 onClick={(e) => this.props.onExpandClick(this.props.category.id, e)}><span className="fa fa-angle-down" /></span>;
        } else if (!isLeaf) {
            expandButton = <span className="category__expand-btn"
                                 onClick={(e) => this.props.onExpandClick(this.props.category.id, e)}><span className="fa fa-angle-right" /></span>
        }
        const classes = ['category'];
        if (isLeaf && this.props.category.parentId !== null) {
            classes.push('category--leaf');
        }
        if (this.props.selected) {
            classes.push('category--selected');
        }

        return (
            <div className={classes.join(' ')} onClick={() => this.props.onCategoryClick(this.props.category.id)}>
                {expandButton}
                <span className="category__name">{this.props.category.name}</span>
                {this.props.mode === LIST_MODE && (<span className="category__edit-btn btn" onClick={(e) => this.showModal(e, EDIT_MODAL)}><span className="fa fa-edit" /></span>)}
                <div className="fr">
                    {this.props.mode === LIST_MODE &&
                    (<div><span className="category__remove-btn btn"
                                onClick={(e) => this.showModal(e, DELETE_MODAL)}><span className="fa fa-trash" /></span>
                        <span className="category__add-btn btn"
                              onClick={(e) => this.showModal(e, ADD_MODAL)}><span className="fa fa-plus-square-o" /></span></div>)}
                    {this.props.mode === DETAIL_MODE && this.props.todo.categoryId !== this.props.category.id
                    && <button className="category__move-btn btn" onClick={() => this.props.onTodoCategoryChange(this.props.category.id)}><span className="fa fa-mail-reply" /></button>}
                </div>
                <Portal style={modalStyles} contentLabel="modal" isOpen={this.state[ADD_MODAL]}>
                    <AddCategoryModal onCancel={() => this.hideModal(ADD_MODAL)} onConfirm={this.confirmAddAndHideModal.bind(this)} />
                </Portal>
                <Portal style={modalStyles} contentLabel="modal" isOpen={this.state[DELETE_MODAL]}>
                    <DeleteCategoryModal onCancel={() => this.hideModal(DELETE_MODAL)}
                         onConfirm={this.confirmDeleteAndHideModal.bind(this)}
                         categoryName={this.props.category.name} />
                </Portal>
                <Portal style={modalStyles} contentLabel="modal" isOpen={this.state[EDIT_MODAL]}>
                    <ChangeCategoryNameModal  onCancel={()=>this.hideModal(EDIT_MODAL)}
                        onConfirm={this.confirmEditAndHideModal.bind(this)}
                    />
                </Portal>
            </div>
        );
    }
}