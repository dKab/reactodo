import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, TOGGLE_VISIBILITY_FILTER,
    TOGGLE_CATEGORY_EXPANDED_STATE, SEARCH_PHRASE_CHANGE, ADD_CATEGORY,
    TODO_CHANGE, CHANGE_TODO_CATEGORY, REMOVE_CATEGORY, EXPAND_CATEGORY, SELECT_CATEGORY,
SHOW_MODAL, HIDE_MODAL } from './actions';


/**
 * This is just to visualize state structure
 * @param state
 * @param action
 * @returns {boolean}
 */
const state = {
    showDone: false,
    searchPhrase: '',
    categories: [
        {
            name: 'category1',
            id: 1,
            selected: false,
            parentId: null,
            expanded: true
        },
        {
            name: 'category1_1',
            id: 2,
            selected: false,
            parentId: 1
        }
    ],
    todos: [
        {
            id: 1,
            name: 'Consider using Redux',
            description: 'text',
            done: false,
            categoryId: 2
        }
    ],
    modal: {
        modalType: null,
        modalProps: {}
    }
};

const initialState = {
    showDone: false,
    searchPhrase: '',
    categories: [],
    todos: [],
    modal: {
        modalType: null,
        modalProps: {}
    }
};


function showDone(state = false, action) {
    switch (action.type) {
        case TOGGLE_VISIBILITY_FILTER:
            return !state;
        default:
            return state
    }
}

function searchPhrase(state = '', action) {
    switch (action.type) {
        case SEARCH_PHRASE_CHANGE:
            return action.phrase;
        default:
            return state;
    }
}

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
                    id: findMaxId(state) + 1
                }
            ];
        case TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        done: !todo.done
                    });
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
                    return Object.assign({}, todo, { categoryId: action.categoryId });
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
            return [
                ...state,
                {
                    name: action.name,
                    parentId: action.parentId,
                    id: state.length ? findMaxId(state) + 1 : 0,
                    selected: state.length ? false : true,
                    expanded: false
                }
            ];
        case TOGGLE_CATEGORY_EXPANDED_STATE:
            return state.map(category => {
                if (category.id === action.id) {
                    return Object.assign({}, category, {expanded: !category.expanded});
                }
                return category;
            });
        case EXPAND_CATEGORY:
            return state.map(category => {
                if (category.id === action.id) {
                    return Object.assign({}, category, { expanded: true});
                }
                return category;
            });
        case SELECT_CATEGORY:
            return state.map(category => {
                if (category.id === action.id) {
                    return Object.assign({}, category, { selected: true });
                } else {
                    return Object.assign({}, category, { selected: false});
                }
            });
        case REMOVE_CATEGORY:
            const index = state.findIndex( category => category.id === action.id);
            return removeChildrenRec(action.id, state);
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

function modal(state = initialState.modal, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case HIDE_MODAL:
            return initialState.modal;
        default:
            return state
    }
}

function findMaxId(array) {
    return Math.max.apply(Math, array.map(object => object.id ));
}

const todoApp = combineReducers({
    showDone,
    searchPhrase,
    todos,
    categories,
    modal
});

export default todoApp