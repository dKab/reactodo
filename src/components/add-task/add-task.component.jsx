import React from 'react';
import {connect} from 'react-redux';
import AddItem from '../add-item/add-item.component';
import {addTodo} from '../../actions';
import Portal from 'react-modal';
import {Modal, modalStyles} from '../modal/modal.component.jsx';
class AddTaskComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: false
        };
    }

    addTask(name) {
        const categoryExists = typeof this.props.selectedCategory !== 'undefined' && !!this.props.categories.find((cat) => cat.id === +this.props.selectedCategory);
        if (this.props.categoryExists !== false) {
            this.props.onButtonClick(name);
        } else {
            this.showWarning();
        }
    }

    showWarning() {
        this.setState({showWarning: true});
    }

    hideWarning() {
        this.setState({showWarning: false});
    }

    render() {
        return (
            <div>
                <AddItem onButtonClick={this.addTask.bind(this)} placeholder="Enter task name"/>
                <Portal style={modalStyles} contentLabel="modal" isOpen={this.state.showWarning}>
                    <Modal onConfirm={this.hideWarning.bind(this)} onCancel={this.hideWarning.bind(this)}>
                        <div style={{color: 'red'}}>You must select a category first</div>
                    </Modal>
                </Portal>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    const selectedCat = ownProps.location.query.category;
    return {
        selectedCategory: selectedCat,
        categories: state.present.categories
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onButtonClick: (name) => {
            name && dispatch(addTodo(name, +ownProps.location.query.category))
        }
    };
};

export const AddTask = connect(mapStateToProps, mapDispatchToProps)(AddTaskComponent);
