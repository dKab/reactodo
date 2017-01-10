import {categories, todos} from './reducers';
import {ADD_TODO, TOGGLE_TODO, TODO_CHANGE, ADD_CATEGORY,
    CHANGE_CATEGORY_NAME, TOGGLE_CATEGORY_EXPANDED_STATE, REMOVE_CATEGORY} from './actions';

describe('todos reducer', () => {

    const reducer = todos;

    it('should handle ADD_TODO', () => {
        expect(
            reducer([], {type: ADD_TODO, name: 'foo', categoryId: 1})
        ).toEqual([
            {
                name: 'foo',
                description: '',
                done: false,
                categoryId: 1,
                id: 0
            }
        ]);
    });

    it('should increment id by 1 for every subsequent ADD_TODO', () => {
        expect(reducer([
            {
                name: 'foo',
                description: '',
                done: false,
                categoryId: 1,
                id: 0
            }
        ], {type: ADD_TODO, name: 'bar', categoryId: 1}
        )).toEqual([
            {
                name: 'foo',
                description: '',
                done: false,
                categoryId: 1,
                id: 0
            },
            {
                name: 'bar',
                description: '',
                done: false,
                categoryId: 1,
                id: 1
            }
        ]);
    });

    it('should handle TOGGLE_TODO', () => {
        expect(reducer([
            {
                name: 'foo',
                description: '',
                done: false,
                categoryId: 1,
                id: 0
            },
            {
                name: 'bar',
                description: '',
                done: false,
                categoryId: 1,
                id: 1
            }
        ], {type: TOGGLE_TODO, id: 0})
        ).toEqual(
            [
                {
                    name: 'foo',
                    description: '',
                    done: true,
                    categoryId: 1,
                    id: 0
                },
                {
                    name: 'bar',
                    description: '',
                    done: false,
                    categoryId: 1,
                    id: 1
                }
            ]
        );
    });

    it('should handle TODO_CHANGE', () => {
        expect(reducer([
            {
                name: 'foo',
                description: '',
                done: true,
                categoryId: 1,
                id: 0
            },
            {
                name: 'bar',
                description: '',
                done: false,
                categoryId: 1,
                id: 1
            }
        ], {type: TODO_CHANGE, todo: {
                name: 'baz',
                description: '',
                done: false,
                categoryId: 2,
                id: 1
        }})
        ).toEqual([
            {
                name: 'foo',
                description: '',
                done: true,
                categoryId: 1,
                id: 0
            },
            {
                name: 'baz',
                description: '',
                done: false,
                categoryId: 2,
                id: 1
            }
        ]);
    });
});

describe('categories reducer', () => {
    const reducer = categories;


    it('should handle ADD_CATEGORY', () => {
        expect(
            reducer(undefined, {type: ADD_CATEGORY, name: 'first', parentId: null})
        ).toEqual([{
            name: 'first',
            parentId: null,
            id: 0,
            expanded: false
        }]);
    });

    it('should expand parent category if child was added', () => {
        expect(
            reducer([{
                name: 'first',
                parentId: null,
                id: 0,
                expanded: false
            }], {type: ADD_CATEGORY, parentId: 0, name: 'second'})
        ).toEqual(
            [{
                name: 'first',
                parentId: null,
                id: 0,
                expanded: true
            },
            {
                name: 'second',
                parentId: 0,
                id: 1,
                expanded: false
            }]
        );
    });

    it('should handle REMOVE_CATEGORY', () => {
        expect(
            reducer(
                [{
                    name: 'first',
                    parentId: null,
                    id: 0,
                    expanded: true
                },
                {
                    name: 'second',
                    parentId: 0,
                    id: 1,
                    expanded: false
                }], {type: REMOVE_CATEGORY, id: 1}
            )
        ).toEqual([
            {
                name: 'first',
                parentId: null,
                id: 0,
                expanded: true
            }
        ]);
    });

    it('should remove all descendants when parent is removed', () => {
        expect(
            reducer([{
                name: 'first',
                parentId: null,
                id: 0,
                expanded: true
            },
            {
                name: 'second',
                parentId: 0,
                id: 1,
                expanded: false
            },
            {
                name: 'third',
                parentId: 1,
                id: 2,
                expanded: false
            }
            ], {type: REMOVE_CATEGORY, id: 0})
        ).toEqual([]);
    });

    it('should handle CHANGE_CATEGORY_NAME',  () => {
        expect(
            reducer([
                {
                    name: 'second',
                    parentId: 0,
                    id: 1,
                    expanded: false
                },
                {
                    name: 'third',
                    parentId: 1,
                    id: 2,
                    expanded: false
                }
            ], {type: CHANGE_CATEGORY_NAME, id: 2, newName: 'newName' })
        ).toEqual([
            {
                name: 'second',
                parentId: 0,
                id: 1,
                expanded: false
            },
            {
                name: 'newName',
                parentId: 1,
                id: 2,
                expanded: false
            }
        ])
    });

    it('should handle TOGGLE_CATEGORY_EXPANDED_STATE', () => {
        expect(
            reducer([
                {
                    name: 'second',
                    parentId: 0,
                    id: 1,
                    expanded: false
                },
                {
                    name: 'newName',
                    parentId: 1,
                    id: 2,
                    expanded: false
                }
            ], {type: TOGGLE_CATEGORY_EXPANDED_STATE, id: 1})
        ).toEqual([
            {
                name: 'second',
                parentId: 0,
                id: 1,
                expanded: true
            },
            {
                name: 'newName',
                parentId: 1,
                id: 2,
                expanded: false
            }
        ])
    });
});
