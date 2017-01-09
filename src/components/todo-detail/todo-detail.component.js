import React from 'react';
import './todo-detail.css';

export default class TodoDetail extends React.Component {

    constructor(props) {
        super(props);
        if (props.todo) {
            this.state = {

                draft: {
                    name: props.todo.name,
                    description: props.todo.description,
                    done: props.todo.done
                }
            };
        }

        this.changeDescription = this.changeDescription.bind(this);
        this.toggleDone = this.toggleDone.bind(this);
        this.changeName = this.changeName.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.hasAnythingChanged = this.hasAnythingChanged.bind(this);
    };

    saveChanges() {
        if (this.state.draft.name) {
            this.props.onSave({...this.props.todo, ...this.state.draft});
        } else {

        }
    }

    changeDescription(description) {
        this.setState({ draft: {...this.state.draft, description: description}});
    }

    toggleDone() {
        this.setState({ draft: {...this.state.draft, done: !this.state.draft.done}});
    }

    changeName(name) {
        this.setState({ draft: {...this.state.draft, name: name}});
    }

    hasAnythingChanged() {
        return Object.keys(this.state.draft).some(key => this.state.draft[key] !== this.props.todo[key]);
    }

    render() {
        return (
            <div className="todo-detail">
                {this.props.todo &&
                ( <div><div className="top">
                    <div className="fr">
                        <button className="todo-detail__save" onClick={this.saveChanges} disabled={!this.hasAnythingChanged()}>Save changes</button>
                        <button onClick={this.props.onCancel}>Cancel</button>
                    </div>
                </div>
                <div><input type="text" value={this.state.draft.name} onChange={e => this.changeName(e.target.value) } /></div>
                <div><input type="checkbox" id="done-checkbox" checked={this.state.draft.done} onChange={this.toggleDone} />
                    <label htmlFor="done-checkbox">Done</label></div>
                <div>
                    <textarea value={this.state.draft.description}
                              onChange={e => this.changeDescription(e.target.value) }
                              className="todo-detail__description" />
                </div></div>) }
                {!this.props.todo && <div>Such todo doesn't exist</div>}
            </div>
        );
    }
}