import { connect } from 'react-redux';
import Modal from '../modal/modal.component';
import { removeCategory, hideModal } from '../../actions';
import React from 'react';

const DeleteCategoryModal = ({ categoryName, onConfirm, onCancel }) => {
    const cancelBtnText = 'Cancel';
    const confirmBtnText = 'Delete';
    return (<Modal onConfirm={onConfirm} onCancel={onCancel} confirmBtnText={confirmBtnText} cancelBtnText={cancelBtnText}>
        <p>Are you sure you want to delete category <b>{categoryName}</b>?<br/>
        (All subcategories will be deleted as well)</p>
    </Modal>);
};

const mapStateToProps = (state, ownProps) => {
     return {categoryName: state.categories.find((cat) => cat.id === ownProps.categoryId).name};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onConfirm: () => dispatch(removeCategory(ownProps.categoryId)) && dispatch(hideModal()),
        onCancel: () => dispatch(hideModal())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteCategoryModal);