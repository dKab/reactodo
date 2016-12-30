import { connect } from 'react-redux';
import Modal from '../modal/modal.component';
import { addCategory, expandCategory, hideModal} from '../../actions';
import React from 'react';

class AddCategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.cancelBtnText = 'Cancel';
        this.confirmBtnText = 'Add';
    }

    render() {
        return (
            <Modal onConfirm={() => this.input.value && this.props.onConfirm(this.input.value)}
                   onCancel={this.props.onCancel}
                   confirmBtnText={this.confirmBtnText}
                   cancelBtnText={this.cancelBtnText}>
                Enter name for a new category: <br/>
                <input style={{border: '1px solid gray'}} type="text" ref={(input) => this.input = input} />
            </Modal>);
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onConfirm: (name) => {
            dispatch(addCategory(name, ownProps.parentId));
            dispatch(expandCategory(ownProps.parentId));
            dispatch(hideModal());
        },
        onCancel: () => dispatch(hideModal())
    }
};

export default connect(
    () => {return {}},
    mapDispatchToProps
)(AddCategoryModal);