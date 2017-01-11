import renderer from 'react-test-render';
import CategoryTree from './category-tree.component';
import {categories} from '../../../testing-utils/deep-nested-category-tree';
import {LIST_MODE, DETAIL_MODE} from '../category/category.component'

test('CategogryTree renders correctly', () => {
	const tree = renderer.create(
		<CategoryTree categories={categories} categoriesMode={LIST_MODE} selectedCategory={'1'} todo={{}} />
	).toJSON();
	expect(tree).toMatchSnapshot();
});
