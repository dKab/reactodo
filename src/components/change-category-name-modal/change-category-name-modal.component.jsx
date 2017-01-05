import Modal from '../modal/modal.component';
import React from 'react';

const cancelBtnText = 'Cancel';
const confirmBtnText = 'Rename';

export class ChangeCategoryNameModal extends React.Component {
    render() {
        return (
            <Modal onConfirm={() => this.input.value && this.props.onConfirm(this.input.value)}
                   onCancel={this.props.onCancel}
                   confirmBtnText={confirmBtnText}
                   cancelBtnText={cancelBtnText}>
                Enter new name for a category:<br/>
                <input style={{border: '1px solid gray'}} type="text" ref={(input) => this.input = input} />
            </Modal>);
    }
}
