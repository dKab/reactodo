import React from 'react';
import CategoryTree from '../category-tree/category-tree.component';

export class VisibleCategoryTree extends React.Component {

	constructor() {
		super();
		this.state = {
			categories: [
				{
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
			]
		}
	}

	render() {
		return <CategoryTree categories={this.state.categories} />;
	}

}