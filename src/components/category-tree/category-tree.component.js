import React from 'react';
import {Category} from '../category/category.component';

export default function CategoryTree(props) {
    const elems = renderTree(props.categories, props.categories, props);

    return (
      <div className="category-tree">
          {elems}
      </div>
    );
}

function renderTree(categories, allCategories, props, rendered = [], omitSubtree = false, margin = 0) {

    const style = {
        marginLeft: margin + 'px'
    };

    return categories.map(cat => {
        let renderCategory = isLeaf => {
            const selected = props.selectedCategory === cat.id;
            return <Category category={cat}
                             isLeaf={isLeaf}
                             onPlusClick={props.onAddChildCategory}
                             onTrashClick={props.onDeleteCategory}
                             onExpandClick={props.onCategoryExpandClick}
                             onCategoryClick={props.onCategorySelect}
                             onEditClick={props.onCategoryEdit}
                             mode={props.categoriesMode}
                             selected={selected}
            />;
        };
        const children = allCategories.filter(category => category.parentId === cat.id);
        if (rendered.indexOf(cat.id) >= 0) {
            return;
        }
        if (children.length > 0) {
            rendered.push(cat.id);
            const subTree = renderTree(children, allCategories, props, rendered, !cat.expanded, 10);
            return omitSubtree
                ? undefined
                : (<div key={cat.id}  style={style}>
                    {renderCategory(false)}
                    {subTree}
                    </div>
                    );
        } else {
            rendered.push(cat.id);
            return omitSubtree ? undefined : <div key={cat.id}  style={style}>{renderCategory(true)}</div>;
        }
    });
}
