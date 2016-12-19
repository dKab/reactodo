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
            name: 'Consider using Redux',
            description: 'text',
            done: true,
            categoryId: 2
        }
    ]
};