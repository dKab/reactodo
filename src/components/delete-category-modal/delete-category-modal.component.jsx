import Modal from '../modal/modal.component';
import React from 'react';


export function DeleteCategoryModal ({ categoryName, onConfirm, onCancel }) {
    const cancelBtnText = 'Cancel';
    const confirmBtnText = 'Delete';
    return (<Modal onConfirm={onConfirm} onCancel={onCancel} confirmBtnText={confirmBtnText} cancelBtnText={cancelBtnText}>
        <p>Are you sure you want to delete category <b>{categoryName}</b>?<br/>
        (All subcategories will be deleted as well)</p>
    </Modal>);
}