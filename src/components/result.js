import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import { resultSelector } from '../store/selectors';
import { clearAnswers } from '../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    marginLeft: theme.spacing(30),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  margin: {
    margin: theme.spacing(1),
    left: '45%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Result() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const results = useSelector(resultSelector);
    const showScore = !!results.questionsResult.length;
    const [resart, updateRestart] = useState(false);

    const restartExamp = () => {
        dispatch(clearAnswers());
        updateRestart(true);
    };

    if (resart) {
        return (<Redirect to={'questions/1'} />);
    }

    return (
        <>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.questionsResult.map((each, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {each.question}
                                </TableCell>
                                <TableCell style={{color: each.color}} align="right">{each.result}</TableCell>
                                <TableCell align="right">{each.isCorrect}</TableCell>
                            </TableRow>
                        ))}
                        {showScore && 
                            <TableRow>
                                <TableCell component="th" scope="row">Total Score</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">{results.score}</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </Paper>
            {showScore && 
                <Fab
                    onClick = {restartExamp}
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    className={classes.margin}
                >
                    <ThreeSixtyIcon className={classes.extendedIcon} />
                    Restart
                </Fab>
            }
        </>
    );
}

export default Result;
