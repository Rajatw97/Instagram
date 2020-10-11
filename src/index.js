import React from 'react';
import Reactdom from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import {createStore} from 'redux'
import reducers from './reducers';


Reactdom.render(
<Provider store={createStore(reducers)}>
<App />
</Provider>,

document.querySelector("#root"));
