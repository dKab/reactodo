/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TODO_CHANGE = 'TODO_CHANGE';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const TOGGLE_CATEGORY_EXPANDED_STATE = 'TOGGLE_CATEGORY_EXPANDED_STATE';
export const CHANGE_CATEGORY_NAME = 'CHANGE_CATEGORY_NAME';
export const UNDO = 'UNDO';
export const REDO = 'REDO';
export {push} from 'react-router-redux';

/*
 * action creators
 */

export function addTodo(name, categoryId) {
    return { type: ADD_TODO, name, categoryId };
}

export function toggleTodo(id) {
    return { type: TOGGLE_TODO, id };
}

export function todoChange(todo) {
    return { type: TODO_CHANGE, todo};
}

export function addCategory(name, parentId) {
    return { type: ADD_CATEGORY, name, parentId};
}

export function removeCategory(id) {
    return { type: REMOVE_CATEGORY, id };
}

export function toggleCategoryExpandedState(id) {
    return { type: TOGGLE_CATEGORY_EXPANDED_STATE, id}
}

export function changeCategoryName(id, newName) {
    return {type: CHANGE_CATEGORY_NAME,  id, newName};
}

export function undo() {
    return {type: UNDO };
}

export function redo() {
    return {type: REDO };
}
