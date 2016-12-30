import { connect } from 'react-redux';
import Modal from '../modal/modal.component';
import { hideModal, changeCategoryName } from '../../actions';
import React from 'react';

class ChangeCategoryNameModal extends React.Component {

    constructor(props) {
        super(props);
        this.cancelBtnText = 'Cancel';
        this.confirmBtnText = 'Rename';
    }

    render() {
        return (
            <Modal onConfirm={() => this.input.value && this.props.onConfirm(this.input.value)}
                   onCancel={this.props.onCancel}
                   confirmBtnText={this.confirmBtnText}
                   cancelBtnText={this.cancelBtnText}>
                Enter new name for a category:<br/>
                <input style={{border: '1px solid gray'}} type="text" ref={(input) => this.input = input} />
            </Modal>);
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onConfirm: (name) => {
            dispatch(changeCategoryName(ownProps.id, name))
            dispatch(hideModal());
        },
        onCancel: () => dispatch(hideModal())
    }
};

export default connect(
    () => {return {}},
    mapDispatchToProps
)(ChangeCategoryNameModal);