import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CommonStyles from './common.module.css';
import { getQuestions } from '../store/interactions/';


const Welcome = () =>  {
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const loadQuestions = async () => {
        try {
            const status = await getQuestions(dispatch);
            if (status) {
                setRedirect(true);
            }
        } catch(error) {
            console.log('Error while loading qustions', error);
        }
    }

    if (redirect) {
        return <Redirect to={'/questions/1'} />;
    }

    return (
        <div className={CommonStyles.container}>
            <VisibilityIcon color="action" />
            <Typography color="textPrimary" variant="h4">Welcome to fun quiz</Typography>
            <Typography color="textSecondary" variant="subtitle1">Click on the below button to start quiz and have fun</Typography>
            <Button onClick={loadQuestions} variant="contained" color="primary">Start Quiz</Button>
        </div>
    );
}

export default Welcome;
