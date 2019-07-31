import {combineReducers} from 'redux';

const questions = (state = {}, action) => {
    switch (action.type) {
        case 'QUESTIONS_LOADED':
            return { 
            	...state,
            	questions: action.questions,
            	updateUsers: [],
                score: 0
            };
        case 'ANSWER_ACTION':
            const newAnswers = [...state.updateUsers];
            newAnswers[action.questionIndex] = action.answer;
            return {
                ...state,
                updateUsers: [...newAnswers]
            }
        case 'CLEAR_ANSWERS':
            return {
                ...state,
                updateUsers: [],
                score: 0
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    questions
});

export default rootReducer;
