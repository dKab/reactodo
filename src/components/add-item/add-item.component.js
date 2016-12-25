import React from 'react';

export default class AddItem extends React.Component {

    add() {
        this.props.onButtonClick(this.input.value);
        this.input.value = '';
    }


    render() {
        return (
            <div className="add-item">
                <input type="text" className="add-item__input" ref={(input) => this.input = input} placeholder={this.props.placeholder} />
                <button className="add-item__button" onClick={this.add.bind(this)}>Add</button>
            </div>
        );
    }

}