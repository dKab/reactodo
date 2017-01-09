import React from 'react';
import AddItem from './add-item.component';
import ReactTestUtils from 'react-addons-test-utils';


it('should output text input with a button', () => {
	const component = ReactTestUtils.renderIntoDocument(<AddItem/>);
	expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input').length).toBe(1);
	expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button').length).toBe(1);
});

it('should invoke callback with input value on button click', () => {
	const spy = jest.fn();
	const component = ReactTestUtils.renderIntoDocument(<AddItem onButtonClick={spy} />);
	const input = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
	ReactTestUtils.Simulate.change(input, {target: {value: 'foo'}});
	const btn = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button');
	ReactTestUtils.Simulate.click(btn);
	expect(spy).toHaveBeenCalledWith('foo');
});

it('should reset input value to empty string', function() {
	const spy = jest.fn();
	const component = ReactTestUtils.renderIntoDocument(<AddItem onButtonClick={spy} />);
	const input = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
	ReactTestUtils.Simulate.change(input, {target: {value: 'foo'}});
	const btn = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button');
	ReactTestUtils.Simulate.click(btn);
	expect(input.value).toBe('');
});