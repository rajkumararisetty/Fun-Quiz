import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CommonStyles from './common.module.css';
import { questionSelector, totalQuestionsSelector } from '../store/selectors';
import { updateAnswers } from '../store/actions';

const Questions = ({match}) => {
    const dispatch = useDispatch();
    const questions = useSelector(questionSelector);
    const totalQuestions = useSelector(totalQuestionsSelector);
    const questionIndex = match.params.id - 1;
    const currentQuestion = questions[questionIndex];
    const [answer, changeAnswer] = useState('');

    if (!currentQuestion) {
        return (<Redirect to = '/' />);
    }

    const handleChange = (event) => {
        const newAnswer = event.target.value;
        changeAnswer(newAnswer);
        dispatch(updateAnswers(questionIndex, newAnswer));
    }

    const goToNextQuestion = () => {
        
    }

    const showNext = answer !== '';
    return (
        <>
            <div className={CommonStyles.container}>
              <Typography color="textPrimary" variant="h5">{match.params.id + '. ' + currentQuestion.question}</Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      className={CommonStyles.answerGroup}
                      value={answer}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="True" control={<Radio />} label="True" />
                      <FormControlLabel value="False" control={<Radio />} label="False" />
                    </RadioGroup>
                </FormControl>
            </div>
            {showNext && 
                <Fab onClick={() => {console.log('Hellow')}} aria-label={'Next'} title={'Next Question'} className={CommonStyles.nextQuestionButton}>
                    <RightIcon />
                </Fab>
            }
        </>
    );
}

export default Questions;
