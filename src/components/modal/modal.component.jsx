import Close from 'react-icons/fa/close';
import React from 'react';
import './modal.css';
export default (props) => {
    return (
        <div className="modal">
            <div className="modal__top-panel"><div className="modal__close-btn btn"><Close onClick={props.onCancel} /></div></div>
            {props.children}
            <div className="modal__buttons">
                <div className="fr">
                    <button className="modal__cancel-btn" onClick={props.onCancel}>{props.cancelBtnText}</button>
                    <button className="modal__confirm-btn" onClick={props.onConfirm}>{props.confirmBtnText}</button>
                </div>
            </div>
        </div>
    );
}
