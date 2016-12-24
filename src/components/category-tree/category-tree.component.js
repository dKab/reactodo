import React from 'react';
import Category from '../category/category.component';

export default function CategoryTree(props) {
    const elems = renderTree(props.categories, 0, props.categories);

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
        if (children.length > 0 && rendered.indexOf(cat.id) === -1) {
            rendered.push(cat.id);
            const subTree = renderTree(children, margin + step, allCategories, rendered);
            return (
                <div key={cat.id}  style={style}>
                    {category}
                    {subTree}
                </div>
            );
        } else if (rendered.indexOf(cat.id) === -1) {
            rendered.push(cat.id);
            return <div key={cat.id}  style={style}>{category}</div>;
        } else {
            return;
        }
    });
}
