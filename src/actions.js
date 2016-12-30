/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_VISIBILITY_FILTER = 'TOGGLE_VISIBILITY_FILTER';
export const SEARCH_PHRASE_CHANGE = 'SEARCH_PHRASE_CHANGE';
export const TODO_CHANGE = 'TODO_CHANGE';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const TOGGLE_CATEGORY_EXPANDED_STATE = 'TOGGLE_CATEGORY_EXPANDED_STATE';
export const CHANGE_TODO_CATEGORY =  'CHANGE_TODO_CATEGORY';
export const EXPAND_CATEGORY = 'EXPAND_CATEGORY';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const CHANGE_CATEGORY_NAME = 'CHANGE_CATEGORY_NAME';

/*
 * action creators
 */

export function addTodo(name, categoryId) {
    return { type: ADD_TODO, name, categoryId };
}

export function toggleTodo(id) {
    return { type: TOGGLE_TODO, id };
}

export function toggleVisibilityFilter(showDone) {
    return { type: TOGGLE_VISIBILITY_FILTER, showDone };
}

export function searchPhraseChange(phrase) {
    return { type: SEARCH_PHRASE_CHANGE, phrase };
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

export function expandCategory(id) {
    return { type: EXPAND_CATEGORY, id}
}

export function selectCategory(id) {
    return {type: SELECT_CATEGORY, id }
}

export function changeTodoCategory(todoId, categoryId) {
    return {type: CHANGE_TODO_CATEGORY, todoId, categoryId};
}

export function showModal(modalType, modalProps) {
    return { type: SHOW_MODAL, modalType, modalProps};
}

export function hideModal() {
    return { type: HIDE_MODAL };
}

export function changeCategoryName(id, newName) {
    return {type: CHANGE_CATEGORY_NAME,  id, newName};
}