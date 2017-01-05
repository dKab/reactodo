import { connect } from 'react-redux';
import CategoryTree from '../category-tree/category-tree.component';
import { toggleCategoryExpandedState,
		changeCategoryName,
		addCategory,
		removeCategory,
		push} from '../../actions';
import {DETAIL_MODE, LIST_MODE} from '../category/category.component';
import {browserHistory} from 'react-router';
import {URLValueMap, SHOW_DONE_DEFAULT_VALUE} from '../search/search.component.jsx';

const getVisibleCategories = (categories, phrase, showDone, todos) => {

	const visible = showDone ? categories : categories.filter(category => isCategoryDone(category, categories, todos));
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
		return typeof undone !== 'undefined';
	});
	return typeof undoneCategory === 'undefined';
}

function getAllDescendants(category, categories, descendants) {
	const children = categories.filter(cat => cat.parentId === category);

	Array.prototype.push.apply(descendants, children);
	children.forEach(child => getAllDescendants(child, categories, descendants));
}

function getCategoryTodos(category, todos) {
	return todos.filter(todo => todo.categoryId === category.id);
}

const mapStateToProps = (state, ownProps) => {
	const showDone = ownProps.location.query.showDone ? URLValueMap.get(ownProps.location.query.showDone) : SHOW_DONE_DEFAULT_VALUE,
			phrase = typeof ownProps.location.query.searchPhrase === 'undefined' ? '' :	 ownProps.location.query.searchPhrase;
	return {
		selectedCategory: +ownProps.location.query.category,
		categories: getVisibleCategories(state.present.categories, phrase, showDone, state.present.todos),
		categoriesMode: ownProps.location.pathname === '/' ? LIST_MODE : DETAIL_MODE
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
		}
	}
};

const VisibleCategoryTree = connect(
		mapStateToProps,
		mapDispatchToProps
)(CategoryTree);

export default VisibleCategoryTree;