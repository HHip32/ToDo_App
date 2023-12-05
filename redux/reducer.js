
const initState = {
    dataSearch: '',
    data: [],
    job: ''
};


const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return {
                ...state,
                dataSearch: action.payload
            };
        case 'SET_JOB':
            return {
                ...state,
                job: action.payload
            };
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            };
        case 'ADD_JOB':
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        default:
            return state;
    }
}
export default todoReducer;