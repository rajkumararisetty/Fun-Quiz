import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './router';
import configureStore from './store';


ReactDOM.render(
    <Provider store={configureStore({})}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
