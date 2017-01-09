import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

import reducer from './reducers';
import { Detailview } from './components/detail-view/detailview.jsx';
import { ListView } from './components/list-view/listview.jsx';
import {NotFound} from './components/not-found/not-found.component.jsx';
import './index.css';

const middleware = routerMiddleware(browserHistory);
const store = createStore(reducer, applyMiddleware(middleware));
const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: (state) => state.present.routing});

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/todo/:id" component={Detailview} />
            <Route path="/" component={ListView} />
            <Route path="*" component={NotFound} />
        </Router>
    </Provider>,
  document.getElementById('root')
);
