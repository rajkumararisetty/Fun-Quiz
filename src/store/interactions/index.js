import axios from 'axios';
import { questionsLoaded } from '../actions'

export const getQuestions = async (dispatch) => {
    const result = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
    if ('data' in result && result.data.response_code === 0) {
        dispatch(questionsLoaded(result.data.results));
        return true;
    }
    return false;
}