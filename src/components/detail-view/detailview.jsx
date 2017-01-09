import React from 'react';
import TodoDetail from '../todo-detail/todo-detail.component';
import { VisibleCategoryTree } from '../visible-category-tree/visible-category-tree.component.jsx';
import {connect} from 'react-redux';
import UndoRedo from '../undo-redo/undo-redo.component.jsx';

import {todoChange, push} from '../../actions';

const DetailviewComponent = ({todo, location,  onSave, onCancel}) => {
        return (

            <div>
                <UndoRedo />
                <header className="todo-title" style={{marginLeft: '10px'}}><h1>{todo && todo.name}</h1></header>
                <div className="categories-left">
                    <VisibleCategoryTree location={location} todo={todo} />
                </div>
                <div className="todos-container">
                    <TodoDetail todo={todo} onSave={onSave} onCancel={onCancel} />
                </div>
            </div>
        );
};

const mapStateToProps = (state, ownProps) => {
    return {
        todo: state.present.todos.find((todo) => +ownProps.params.id === todo.id),
        location: ownProps.location
    }
};

const mapDispatchToProps = (dispatch, ownProps) =>  {
    return {
        onSave: (todo) => dispatch(todoChange(todo)),
        onCancel: () => dispatch(push({...ownProps.location, pathname: '/'}))
    }
};

export const Detailview = connect(mapStateToProps, mapDispatchToProps)(DetailviewComponent);