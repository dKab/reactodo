import Modal from '../modal/modal.component';
import React from 'react';


export class AddCategoryModal extends React.Component {
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
