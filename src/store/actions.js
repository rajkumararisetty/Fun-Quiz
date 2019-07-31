export const questionsLoaded = (questions) => ({type: 'QUESTIONS_LOADED', questions});
export const updateAnswers = (questionIndex, answer) => ({type: 'ANSWER_ACTION', questionIndex, answer})
