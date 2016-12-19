import React from 'react';
import Category from '../category/category.component';

export default function Categorytree(props) {
    const categories = [{
            name: 'category1',
            id: 1,
            parentId: null,
        },
        {
            name: 'category1_1',
            id: 2,
            parentId: 1
            },
        {
            name: 'category1_2',
            id: 3,
            parentId: 1
            },
        {
            name: 'category1_3',
            id: 4,
            parentId: 1
            },
        {
            name: 'category1_2_1',
            id: 5,
            parentId: 3
            },
        {
            name: 'category2',
            id: 6,
            parentId: null
            },
        {
            name: 'category3',
            id: 7,
            parentId: null
            },
        {
            name: 'category2_1',
            id: 8,
            parentId: 6
            },
        ], elems = renderTree(categories, 0, categories);

    return (
      <div className="category-tree">
          {elems}
      </div>
    );
}

function renderTree(categories, margin, allCategories, rendered = []) {

    const style = {
        marginLeft: margin + 'px'
    }, step = 10;

    return categories.map((cat) => {
        const category = <Category category={cat} />;
        const children = allCategories.filter(category => category.parentId === cat.id);
        if (children.length > 0) {
            const subTree = renderTree(children, margin + step, allCategories, rendered);
            return (
                <div key={cat.id}  style={style}>
                    {category}
                    {subTree}
                </div>
            );
        } else if (rendered.indexOf(cat.id) === -1) {
            console.log(cat.id);
            rendered.push(cat.id);
            return <div key={cat.id}  style={style}>{category}</div>;
        } else {
            return;
        }
    });
}
