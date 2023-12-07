import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import todoReducer from './reducer'; // Đảm bảo bạn đã import reducer của mình

const store = createStore(todoReducer, applyMiddleware(thunk));

export default store;