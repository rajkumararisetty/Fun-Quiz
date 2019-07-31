import {combineReducers} from 'redux';

const questions = (state = {}, action) => {
    switch (action.type) {
        case 'QUESTIONS_LOADED':
            return { 
            	...state,
            	questions: action.questions,
                keys: (action.questions).length,
            	result: []
            };
        case 'ANSWER_ACTION':
            const newResult = [...state.result];
            newResult[action.questionIndex] = action.answer;
            return {
                ...state,
                result: [...newResult]
            }
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    questions
});

export default rootReducer;