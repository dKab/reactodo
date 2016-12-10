import React from 'react';

export default class AddItem extends React.Component {
    
    handleBtnClick() {

    }

    render() {
        return (
            <div className="add-item">
                <input type="text" className="add-item__input" ref={(input) => this.input = input} placeholder={this.props.placeholder} />
                <button className="add-item__button" onClick={this.handleBtnClick.bind(this)}>Add</button>
            </div>
        );
    }

}