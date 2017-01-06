import React from 'react';

export default class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.onChange = this.onChange.bind(this);
        this.add = this.add.bind(this);
    }

    add() {
        this.props.onButtonClick(this.state.value);
        this.setState({value: ''});
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div className="add-item">
                <input type="text" className="add-item__input" value={this.state.value} onChange={this.onChange} placeholder={this.props.placeholder} />
                <button disabled={!this.state.value} className="add-item__button" onClick={this.add}>Add</button>
            </div>
        );
    }

}