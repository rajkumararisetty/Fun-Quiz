import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CommonStyles from './common.module.css';
import { questionSelector, totalQuestionsSelector, userAnswersSelector } from '../store/selectors';
import { updateAnswers } from '../store/actions';

const Questions = ({match, history}) => {
    const urlParam = parseInt(match.params.id);
    const dispatch = useDispatch();
    const questions = useSelector(questionSelector);
    const totalQuestions = useSelector(totalQuestionsSelector);
    const userAnswers = useSelector(userAnswersSelector);
    const questionIndex = urlParam - 1;
    const currentQuestion = questions[questionIndex];
    const [answer, changeAnswer] = useState('');
    const [quizStatus, quizCompleted] = useState(false);

    useEffect(() => {
        if (answer !== '') {
            dispatch(updateAnswers(questionIndex, answer));
        } else {
            changeAnswer(get(userAnswers, urlParam - 1, ''));
        }
    }, [answer, urlParam]);

    if (!currentQuestion) {
        return (<Redirect to = '/' />);
    }

    const handleChange = (event) => {
        const newAnswer = event.target.value;
        changeAnswer(newAnswer);
    }

    const goToNextQuestion = (question) => {
        changeAnswer('');
        const nextIndex = urlParam + question;
        if (nextIndex > totalQuestions) {
            quizCompleted(true);
            return
        }
        history.push(`/questions/${nextIndex}`);
        return
    }

    const showNext = answer !== '';
    const showPrev = urlParam > 1;

    if (quizStatus) {
        return (<Redirect to="/result" />)
    }

    return (
        <>
            {showPrev && 
                <Fab onClick={() => goToNextQuestion(-1)} aria-label={'Prev'} title={'Next Question'} className={CommonStyles.prevQuestionButton}>
                    <LeftIcon />
                </Fab>
            }
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
                <Fab onClick={() => goToNextQuestion(1)} aria-label={'Next'} title={'Next Question'} className={CommonStyles.nextQuestionButton}>
                    <RightIcon />
                </Fab>
            }
        </>
    );
}

export default Questions;
