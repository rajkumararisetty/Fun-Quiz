import { createSelector } from 'reselect';
import { get } from 'lodash';

const questions = state => get(state, 'questions.questions', []);
export const questionSelector = createSelector(questions, questions => {
    let updatedQuestions = [];
    questions.forEach((eachQuestion) => {
        updatedQuestions = [
            ...updatedQuestions,
            {
                ...eachQuestion, 
                question: eachQuestion.question.replace(/&quot;/g,'"')
            }
        ];
    });
    return updatedQuestions;
});

export const totalQuestionsSelector = createSelector(questions, q => q.length);

const userAnswers = state => get(state, 'questions.updateUsers', []);
export const userAnswersSelector = createSelector(userAnswers, a => a);

export const resultSelector = createSelector(questions, userAnswers, (questions, userAnswers) => {
    let score = 0;
    let questionsResult = [];
    questions.forEach((eachQuestion, index) => {
        const isCorrect = eachQuestion['correct_answer'] === userAnswers[index] ? 1 : 0;
        score += isCorrect;
        questionsResult = [...questionsResult, {'question': eachQuestion.question, result: isCorrect ? 'correct' : 'wrong', color: isCorrect ? 'green' : 'red', isCorrect}];
    });
    return {score, questionsResult}
});
