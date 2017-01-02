import { connect } from 'react-redux';
import CategoryTree from '../category-tree/category-tree.component';
import { toggleCategoryExpandedState, selectCategory, addCategory} from '../../actions';
import {DELETE_MODAL, ADD_CATEGORY_MODAL, CHANGE_CATEGORY_NAME_MODAL } from '../modal-root/modal-root.component';
import {DETAIL_MODE, LIST_MODE} from '../category/category.component';
//import { browserHistory } from 'react-router';
import {compose} from 'redux';


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

	return {
		categories: getVisibleCategories(state.present.categories, state.present.searchPhrase, state.present.showDone, state.present.todos),
		categoriesMode: ownProps.pathname === '/' ? LIST_MODE : DETAIL_MODE
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onAddChildCategory: (name, parentId) => {
			dispatch(addCategory(name, parentId));
		},
		onDeleteCategory: (id, e) => {
			//dispatch(showModal(DELETE_MODAL, {categoryId: id}));
			e.stopPropagation();
		},
		onCategoryExpandClick: (id, e) => {
			dispatch(toggleCategoryExpandedState(id));
			e.stopPropagation();
		},
		onCategorySelect: (id) => {
			dispatch(selectCategory(id));
			if (ownProps.pathname === '/') {
				//browserHistory.push('/')
			}
		},
		onCategoryEdit: (id, e) =>  {
			//dispatch(showModal(CHANGE_CATEGORY_NAME_MODAL, {id}));
			e.stopPropagation();
		}
	}
};

const VisibleCategoryTree = connect(
		mapStateToProps,
		mapDispatchToProps
)(CategoryTree);

export default VisibleCategoryTree;