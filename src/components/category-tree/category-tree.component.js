import React from 'react';
import Category from '../category/category.component';

export default function Categorytree(props) {
    const categories = [
        { name: 'category1', id: 1, children: [
            {
                name: 'category1_1', id: 5
            },
            {
                name: 'category1_2', id: 6
            }
        ] },
        { name: 'category2',  id: 2},
        { name: 'category3', id: 3, children: [
            {
                name: 'category3_1', id: 7
            },
            {
                name: 'category3_2', id: 8, children: [
                {
                    name: 'category3_2_1', id: 9
                },
                {
                    name: 'category3_2_2', id: 10
                }
            ]
            }
        ] },
        { name: 'category4', id: 4 }
    ], elems = renderTree(categories, 0);

    return (
      <div className="category-tree">
          {elems}
      </div>
    );
}

function renderTree(categories, margin) {

    const style = {
        marginLeft: margin + 'px'
    }, step = 10;

    return categories.map((cat) => {
        const category = <Category category={cat} />;

        if (cat.children && cat.children.length > 0) {
            const subTree = renderTree(cat.children, margin + step);
            return (
                    <div key={cat.id}  style={style}>
                        {category}
                        {subTree}
                    </div>
                );
        } else {
            return <div key={cat.id}  style={style}>{category}</div>;
        }
    });
}
