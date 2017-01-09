import React from 'react';
import AddItem from './add-item.component';
import ReactTestUtils from 'react-addons-test-utils';


it('should output text input with a button', () => {
	const component = ReactTestUtils.renderIntoDocument(<AddItem/>);
	expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input').length).toBe(1);
});
