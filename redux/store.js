// store/index.js
import { createStore } from 'redux';
import todoReducer from './reducer'; // Điều chỉnh đường dẫn tới rootReducer của bạn nếu cần thiết

// Tạo store với rootReducer
const store = createStore(todoReducer);

export default store;
