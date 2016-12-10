import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './index.css';
import { Detailview } from './components/detail-view/detailview';
import { Listview } from './components/list-view/listview';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/todo/:id" component={Detailview} />
        <Route path="/" component={Listview} />
    </Router>,
  document.getElementById('root')
);
