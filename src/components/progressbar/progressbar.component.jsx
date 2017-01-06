import React from 'react';
import  {connect} from 'react-redux';

import './progressbar.css';

function ProgressBarComponent({ percents }) {
    const styles = {
        width: percents + '%'
    };
    return (<div className="progress-bar">
                <div className="progress-bar__finished" style={styles}></div>
            </div>);
}

function isCategoryDone(categoryId, todos) {
    const categoryTodos = todos.filter(todo => todo.categoryId === categoryId);
    if (categoryTodos.length === 0) {
        return false;
    } else {
        return !categoryTodos.some(todo => todo.done === false);
    }
}

function getCompletedPercents(categories, todos) {
    const completedCategories = categories.filter((cat) => isCategoryDone(cat.id, todos));
    return Math.ceil(completedCategories.length / categories.length * 100);
}


const mapStateToProps = (state) => {
    return {
        percents: getCompletedPercents(state.present.categories, state.present.todos)
    };
};

export const ProgressBar = connect(mapStateToProps)(ProgressBarComponent);