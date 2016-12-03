import React from 'react';
import Category from '../category/category.component';

export default function Categorytree(props) {
    const categories = [
        { name: 'category1'  },
        { name: 'category2'  },
        { name: 'category3'  },
        { name: 'category4'  }
    ];

    const elems = categories.map((cat) => {
        return <Category category={cat} />
    });

    return (
      <div>
          {elems}
      </div>
    );
}
