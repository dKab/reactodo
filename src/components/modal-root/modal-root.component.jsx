import DeleteCategoryModal from '../delete-category-modal/delete-category-modal.component';
import CreateCategoryModal from '../create-category-modal/create-category-modal.component';
import React from 'react';
import {connect} from 'react-redux';

export const DELETE_MODAL = 'DELETE_MODAL';
export const CREATE_MODAL = 'CREATE_MODAL';

const MODAL_COMPONENTS = {
    [DELETE_MODAL]: DeleteCategoryModal,
    [CREATE_MODAL]: CreateCategoryModal
};

const ModalRoot = ({ modalType, modalProps }) => {
    const overlayStyles = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 100,
        background: 'lightgray',
        opacity: 0.5
    },
    modalStyles = {
        zIndex: 110,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };

    if (!modalType) {
        return null;
    }
    const SpecificModal = MODAL_COMPONENTS[modalType];
    return (<div>
                <div style={overlayStyles} className="overlay"></div>
                <div style={modalStyles} className="modal-container">
                    <SpecificModal {...modalProps} />
                </div>
            </div>);
};

export default connect(
    state => state.modal
)(ModalRoot);

