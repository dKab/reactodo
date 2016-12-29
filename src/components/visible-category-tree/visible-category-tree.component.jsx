import { connect } from 'react-redux';
import CategoryTree from '../category-tree/category-tree.component';
import { addCategory, removeCategory, toggleCategoryExpandedState,
expandCategory, selectCategory, showModal } from '../../actions';
import {DELETE_MODAL} from '../modal-root/modal-root.component';


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

const mapStateToProps = (state) => {
	return {
		categories: getVisibleCategories(state.categories, state.searchPhrase, state.showDone, state.todos)
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddChildCategory: (parentId, e) => {
			const name = prompt('Enter category name: ');
			if (!name) {
				return;
			}
			dispatch(addCategory(name, parentId));
			dispatch(expandCategory(parentId));
			e.stopPropagation();
		},
		onDeleteCategory: (id, e) => {
			dispatch(showModal(DELETE_MODAL, {categoryId: id}));
			e.stopPropagation();
		},
		onCategoryExpandClick: (id, e) => {
			dispatch(toggleCategoryExpandedState(id));
			e.stopPropagation();
		},
		onCategorySelect: (id) => dispatch(selectCategory(id))
	}
};

const VisibleCategoryTree = connect(
		mapStateToProps,
		mapDispatchToProps
)(CategoryTree);

export default VisibleCategoryTree;