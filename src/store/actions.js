export const questionsLoaded = (questions) => ({type: 'QUESTIONS_LOADED', questions});
export const updateUserAnswers = (questionIndex, answer) => ({type: 'ANSWER_ACTION', questionIndex, answer})
export const clearAnswers = () => ({type: 'CLEAR_ANSWERS'});
