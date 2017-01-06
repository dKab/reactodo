import React from 'react';
import TodoDetail from '../todo-detail/todo-detail.component';
import Categorytree from '../category-tree/category-tree.component';

export class Detailview extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        const id = this.props.params.id;

        this.fetchTodo(id, (err, todo) =>
            this.setState({ todo: todo })
        );
    }

    fetchTodo(id, cb) {
        const item = this.state.todos.find(todo => todo.id === +id);
        if (item) {
            cb(null, item);
        } else {
            cb('Couldn not find item with id ' + id);
        }
    }

    render() {
        return (
            <div>
                <header className=""><h1>{this.state.todo.title}</h1></header>
                <div className="categories-left">
                    <Categorytree />
                </div>
                <div className="todos-container">
                    <TodoDetail />
                </div>
            </div>
        );
    }
}