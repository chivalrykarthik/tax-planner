import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from './../../model';
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export const Income: React.FC<Form> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Income
      </Typography>
      <div className={classes.margin}>
        <TextField
          id="outlined-basic"
          label="Income"
          variant="outlined"
          name="income"
          value={props.data.income || ''}
          onChange={props.handleChange}
        />
      </div>
    </>
  );
};

export const Investment: React.FC<Form> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Investments
      </Typography>
      <div className={classes.margin}>
        <TextField
          id="outlined-basic"
          label="Investment - 80C"
          variant="outlined"
          name="investment"
          value={props.data.investment || ''}
          onChange={props.handleChange}
        />
      </div>
    </>
  );
};

export const Deductions: React.FC<Form> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Deductions
      </Typography>
      <div className={classes.margin}>
        <TextField
          id="outlined-basic"
          label="Health Insurance - 80D"
          variant="outlined"
          name="deduction80D"
          value={props.data.deduction80D || ''}
          onChange={props.handleChange}
        />
      </div>
      <div className={classes.margin}>
        <TextField
          id="outlined-basic"
          label="Other"
          variant="outlined"
          name="deductionOther"
          value={props.data.deductionOther || ''}
          onChange={props.handleChange}
        />
      </div>
    </>
  );
};

export const HomeLoan: React.FC<Form> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Loss on property
      </Typography>
      <div className={classes.margin}>
        <TextField
          id="outlined-basic"
          label="Interest Paid"
          variant="outlined"
          name="loanInterest"
          value={props.data.loanInterest || ''}
          onChange={props.handleChange}
        />
      </div>
      {/* <div className={classes.margin}>
        <TextField
          id="outlined-basic"
          label="Other"
          variant="outlined"
          name="loanOther"
          value={props.data.loanOther || ''}
          onChange={props.handleChange}
        />
  </div>*/}
    </>
  );
};
