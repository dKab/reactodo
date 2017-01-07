import { connect } from 'react-redux';
import CategoryTree from '../category-tree/category-tree.component';
import { toggleCategoryExpandedState,
		changeCategoryName,
		changeTodoCategory,
		addCategory,
		removeCategory,
		push} from '../../actions';
import {DETAIL_MODE, LIST_MODE} from '../category/category.component';
import {browserHistory} from 'react-router';
import {URLValueMap, SHOW_DONE_DEFAULT_VALUE} from '../search/search.component.jsx';

export const getVisibleCategories = (categories, searchPhrase, showDoneUrlParam, todos) => {
	const showDone = showDoneUrlParam ? URLValueMap.get(showDoneUrlParam) : SHOW_DONE_DEFAULT_VALUE,
			phrase = typeof searchPhrase === 'undefined' ? '' :	 searchPhrase;
	const visible = showDone ? categories : categories.filter(category => !isCategoryDone(category, categories, todos));
	if (phrase !== '') {
		return visible.filter((cat) => cat.name.indexOf(phrase) >= 0);
	}
	return visible;
};


function isCategoryDone(category, categories, todos) {
	const descendants = [];
	getAllDescendants(category, categories, descendants);
	const allRelevantCategories = descendants.concat([category]),
			undoneCategory = allRelevantCategories.find(cat => {
		const categoryTodos = getCategoryTodos(cat, todos),
				undone = categoryTodos.find(todo => todo.done === false);
		return typeof undone !== 'undefined' || categoryTodos.length === 0 ;
	});
	return typeof undoneCategory === 'undefined';
}

function getAllDescendants(category, categories, descendants) {
	const children = categories.filter(cat => cat.parentId === category.id);

	Array.prototype.push.apply(descendants, children);
	children.forEach(child => getAllDescendants(child, categories, descendants));
}

function getCategoryTodos(category, todos) {
	return todos.filter(todo => todo.categoryId === category.id);
}

const mapStateToProps = (state, ownProps) => {
	return {
		selectedCategory: +ownProps.location.query.category,
		categories: getVisibleCategories(state.present.categories, ownProps.location.query.searchPhrase, ownProps.location.query.showDone, state.present.todos),
		categoriesMode: ownProps.location.pathname === '/' ? LIST_MODE : DETAIL_MODE,
		todo: ownProps.todo
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onAddChildCategory: (name, parentId) => {
			dispatch(addCategory(name, parentId));
		},
		onDeleteCategory: (id) => {
			dispatch(removeCategory(id));
		},
		onCategoryExpandClick: (id, e) => {
			dispatch(toggleCategoryExpandedState(id));
			e.stopPropagation();
		},
		onCategorySelect: (id) => {
			if (ownProps.location.pathname === '/') {
				dispatch(push({ ...ownProps.location, query: {...ownProps.location.query, category: id}}));
			}
		},
		onCategoryEdit: (id, name) =>  {
			dispatch(changeCategoryName(id, name));
		},
		onTodoCategoryChange: (categoryId) => {
			dispatch(changeTodoCategory(ownProps.todo.id, categoryId));
		}
	}
};

export const VisibleCategoryTree = connect(
		mapStateToProps,
		mapDispatchToProps
)(CategoryTree);