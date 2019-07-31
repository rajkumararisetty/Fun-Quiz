import {createSelector} from 'reselect';
import {get} from 'lodash';

const questions = state => get(state, 'questions.questions', []);
export const questionSelector = createSelector(questions, q => q);
export const totalQuestionsSelector = createSelector(questions, q => q.length);