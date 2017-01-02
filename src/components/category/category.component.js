import React from 'react';
import Collapse from 'react-icons/fa/angle-down';
import Expand from 'react-icons/fa/angle-right';
import Edit from 'react-icons/fa/edit';
import Remove from 'react-icons/fa/trash';
import Plus from 'react-icons/fa/plus-square-o';
import Move from 'react-icons/fa/mail-reply';
import './category.css';
import Modal from 'react-modal';

export const LIST_MODE = 'LIST_MODE';
export const DETAIL_MODE = 'DETAIL_MODE';
import {AddCategoryModal} from '../add-category-modal/add-category-modal.component';

export class Category extends React.Component {


    constructor(props) {
        super();
        this.state = {

        };
        this.modalStyles = {
            content : {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                padding: 'none'
            }
        };
    }

    showAddModal(e) {
        this.setState({addSubCategegoryModalOpened: true});
        e.stopPropagation();
    }

    confirmAndCloseAddModal(name) {
        this.props.onPlusClick(name, this.props.category.id);
        this.hideAddModal();
    }

    hideAddModal() {
        this.setState({addSubCategegoryModalOpened: false});
    }



    render() {
        let expandButton = null,
            isLeaf = this.props.isLeaf;
        if (this.props.category.expanded) {
            expandButton = <span className="category__expand-btn category__expand-btn--expanded"
                                 onClick={(e) => this.props.onExpandClick(this.props.category.id, e)}><Collapse /></span>;
        } else if (!isLeaf) {
            expandButton = <span className="category__expand-btn"
                                 onClick={(e) => this.props.onExpandClick(this.props.category.id, e)}><Expand /></span>
        }
        const classes = ['category'];
        if (isLeaf && this.props.category.parentId !== null) {
            classes.push('category--leaf');
        }
        if (this.props.category.selected) {
            classes.push('category--selected');
        }

        return (
            <div className={classes.join(' ')} onClick={() => this.props.onCategoryClick(this.props.category.id)}>
                {expandButton}
                <span className="category__name">{this.props.category.name}</span>
                <span className="category__edit-btn btn" onClick={(e) => this.props.onEditClick(this.props.category.id, e)}><Edit /></span>
                <div className="fr">
                    {this.props.mode === LIST_MODE &&
                    (<div><span className="category__remove-btn btn"
                                onClick={(e) => this.props.onTrashClick(this.props.category.id, e)}><Remove /></span>
                        <span className="category__add-btn btn"
                              onClick={(e) => this.showAddModal(e)}><Plus /></span></div>)}
                    {this.props.mode === DETAIL_MODE && <button className="category__move-btn btn"><Move /></button>}
                </div>
                <Modal style={this.modalStyles} contentLabel="modal" isOpen={this.state.addSubCategegoryModalOpened}>
                    <AddCategoryModal onCancel={() => this.hideAddModal()} onConfirm={this.confirmAndCloseAddModal.bind(this)} />
                </Modal>
            </div>
        );
    }
}