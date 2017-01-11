import React from 'react';
import './modal.css';
export const modalStyles = {
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
export const Modal = (props) => {
    return (
        <div className="modal">
            <div className="modal__top-panel"><div className="modal__close-btn btn"><span className="fa fa-close" onClick={props.onCancel} /></div></div>
            {props.children}
            <div className="modal__buttons">
                <div className="fr">
                    <button className="modal__cancel-btn" onClick={props.onCancel}>{props.cancelBtnText || 'Cancel'}</button>
                    <button className="modal__confirm-btn" onClick={props.onConfirm}>{props.confirmBtnText || 'OK'}</button>
                </div>
            </div>
        </div>
    );
}
