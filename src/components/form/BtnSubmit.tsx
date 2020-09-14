import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  btnContainer: {
    margin: theme.spacing(1),
    width: '100%',
    textAlign: 'right',
  },
}));

const BtnSubmit: React.FC<any> = (props) => {
  let classes = useStyles();
  return (
    <>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.calculateTax}
        >
          Calculate Tax
        </Button>
      </div>
    </>
  );
};

export default BtnSubmit;
