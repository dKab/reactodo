import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { ADD_TODO, TOGGLE_TODO,
    TOGGLE_CATEGORY_EXPANDED_STATE, ADD_CATEGORY,
    TODO_CHANGE, CHANGE_TODO_CATEGORY, REMOVE_CATEGORY, CHANGE_CATEGORY_NAME } from './actions';
import {LOCATION_CHANGE} from 'react-router-redux';

const initialState = {
    categories: [],
    todos: []
};

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    name: action.name,
                    description: '',
                    done: false,
                    categoryId: action.categoryId,
                    id: state.length ? findMaxId(state) + 1 : 0
                }
            ];
        case TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return {...todo, done: !todo.done };
                }
                return todo
            });
        case TODO_CHANGE:
            return state.map(todo => {
                if (todo.id === action.todo.id) {
                    return action.todo;
                }
                return todo;
            });
        case CHANGE_TODO_CATEGORY:
            return state.map(todo => {
                if (todo.id === action.todoId) {
                    return {...todo, categoryId: action.categoryId };
                }
                return todo;
            });
        default:
            return state
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case ADD_CATEGORY:
            const newState = [
                ...state,
                {
                    name: action.name,
                    parentId: action.parentId,
                    id: state.length ? findMaxId(state) + 1 : 0,
                    selected: state.length ? false : true,
                    expanded: false
                }
            ];

            return newState.map((cat) => {
            if (cat.id === action.parentId) {
                return {...cat, expanded: true}
            }
            return cat;
        });
        case TOGGLE_CATEGORY_EXPANDED_STATE:
            return state.map(category => {
                if (category.id === action.id) {
                    return {...category, expanded: !category.expanded};
                }
                return category;
            });
        case REMOVE_CATEGORY:
            return removeChildrenRec(action.id, state);
        case CHANGE_CATEGORY_NAME:
            return state.map(category => {
                if (category.id === action.id) {
                    return {...category, name: action.newName};
                }
                return category;
            });
        default:
            return state;
    }

    function removeChildrenRec(id, array) {
        let children = array.filter(cat => cat.parentId === id),
            filtered = array.filter(cat => cat.parentId !== id && cat.id !== id);
        while (children.length > 0) {
            filtered = removeChildrenRec(children.shift().id, filtered);
        }
        return filtered;
    }
}

function findMaxId(array) {
    return Math.max.apply(Math, array.map(object => object.id ));
}

const todoApp = combineReducers({
    todos,
    categories,
    routing: routerReducer
});

export default undoable(todoApp);

function undoable(reducer) {
    // Call the reducer with empty action to populate the initial state
    const initialState = {
        past: [],
        present: reducer(undefined, {}),
        future: []
    };

    // Return a reducer that handles undo and redo
    return function (state = initialState, action) {
        const { past, present, future } = state;
        console.log(action);
        switch (action.type) {
            case 'UNDO':
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);
                return {
                    past: newPast,
                    present: previous,
                    future: [ present, ...future ]
                };
            case 'REDO':
                const next = future[0];
                const newFuture = future.slice(1);
                return {
                    past: [ ...past, present ],
                    present: next,
                    future: newFuture
                };
            default:
                // Delegate handling the action to the passed reducer
                const newPresent = reducer(present, action);
                if (present === newPresent) {
                    return state
                }
                const initialLocationChange = (action.type === LOCATION_CHANGE) && !present.routing.locationBeforeTransitions;
                const newState =  {
                    past: initialLocationChange ? past : [ ...past, present ],
                    present: newPresent,
                    future: []
                };
                console.log(newState);
                return newState;
        }
    }
}