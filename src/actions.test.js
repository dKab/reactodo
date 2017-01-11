import * as actions from './actions';

describe ('addCategory', () => {
    it(`should create ${actions.ADD_CATEGORY} action`, () => {
        const expectedAction = {
            type: actions.ADD_CATEGORY,
            parentId: 5,
            name: 'someName'
        };
        expect(actions.addCategory('someName', 5)).toEqual(expectedAction);
    });
});

describe ('removeCategory', () => {
    it(`should create ${actions.REMOVE_CATEGORY} action`, () => {
        const expectedAction = {
            type: actions.REMOVE_CATEGORY,
            id: 10
        };
        expect(actions.removeCategory(10)).toEqual(expectedAction);
    });
});


describe ('changeCategoryName', () => {
    it(`should create ${actions.CHANGE_CATEGORY_NAME} action`, () => {
        const expectedAction = {
            type: actions.CHANGE_CATEGORY_NAME,
            newName: 'foo',
            id: 3
        };
        expect(actions.changeCategoryName(3, 'foo')).toEqual(expectedAction);
    });
});


describe ('toggleCategoryExpandedState', () => {
    it(`should create ${actions.TOGGLE_CATEGORY_EXPANDED_STATE} action`, () => {
        const expectedAction = {
            type: actions.TOGGLE_CATEGORY_EXPANDED_STATE,
            id: 0
        };
        expect(actions.toggleCategoryExpandedState(0)).toEqual(expectedAction);
    });
});

describe ('addTodo', () => {
    it(`should create ${actions.ADD_TODO} action`, () => {
        const expectedAction = {
            type: actions.ADD_TODO,
            categoryId: 1,
            name: 'bar'
        };
        expect(actions.addTodo('bar', 1)).toEqual(expectedAction);
    });
});

describe ('todoChange', () => {
    it(`should create ${actions.TODO_CHANGE} action`, () => {
        const expectedAction = {
            type: actions.TODO_CHANGE,
            todo: {}
        };
        expect(actions.todoChange({})).toEqual(expectedAction);
    });
});

describe ('toggleTodo', () => {
    it(`should create ${actions.TOGGLE_TODO} action`, () => {
        const expectedAction = {
            type: actions.TOGGLE_TODO,
            id: 100
        };
        expect(actions.toggleTodo(100)).toEqual(expectedAction);
    });
});

describe ('redo', () => {
    it(`should create ${actions.REDO} action`, () => {
        const expectedAction = {
            type: actions.REDO
        };
        expect(actions.redo()).toEqual(expectedAction);
    });
});

describe ('undo', () => {
    it(`should create ${actions.UNDO} action`, () => {
        const expectedAction = {
            type: actions.UNDO
        };
        expect(actions.undo()).toEqual(expectedAction);
    });
});
