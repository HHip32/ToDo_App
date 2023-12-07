import {
    CREATE_JOB_SUCCESS,
    READ_JOBS_SUCCESS,
    UPDATE_JOB_SUCCESS,
    DELETE_JOB_SUCCESS,
} from './action'


const initState = {
    data: {
        username: '',
        todos: [],
        id: ''
    },
};


const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    todos: [...state.data.todos, action.payload],
                },
            };
        case UPDATE_JOB_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        case DELETE_JOB_SUCCESS:
            // Lọc ra các công việc khác công việc được xóa
            const updatedJobs = state.data.todos.filter(job => job.id !== action.payload);
            return {
                ...state,
                data: {
                    ...state.data,
                    todos: updatedJobs,
                },
            };
        case READ_JOBS_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
export default todoReducer;