import React from 'react';
import { Provider } from 'react-redux';
import {ProgressBar} from './progressbar.component.jsx';
import {mount} from 'enzyme';
import {storeFake} from '../../../testing-utils/fakeStore';
import {eightyPercentsDoneState, fortyPercentsDoneState, fortyPercentsDoneState2} from '../../../testing-utils/fake-state';


it('should correctly calculate percentage of completed categories and apply styles accordingly (1)', () => {
    const store = storeFake({present: fortyPercentsDoneState });
    const component = mount(
        <Provider store={store}>
            <ProgressBar />
        </Provider>
    );
    expect(component.find('.progress-bar__finished').getDOMNode().getAttribute('style')).toBe('width: 40%;');
});

it('should correctly calculate percentage of completed categories and apply styles accordingly (2)', () => {
    const store = storeFake({present: fortyPercentsDoneState2 });
    const component = mount(
        <Provider store={store}>
            <ProgressBar />
        </Provider>
    );
    expect(component.find('.progress-bar__finished').getDOMNode().getAttribute('style')).toBe('width: 40%;');
});

it('should correctly calculate percentage of completed categories and apply styles accordingly (3)', () => {
    const store = storeFake({present: eightyPercentsDoneState });
    const component = mount(
        <Provider store={store}>
            <ProgressBar />
        </Provider>
    );
    expect(component.find('.progress-bar__finished').getDOMNode().getAttribute('style')).toBe('width: 80%;');
});