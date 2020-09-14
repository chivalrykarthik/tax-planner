import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Row, Column, FinalData } from './../../model';
import { constants } from './../../CONSTANTS';
//import { makeStyles } from '@material-ui/core/styles';

const Heading: React.FC<Column> = (props) => {
  return (
    <TableCell>
      <Typography variant="h6" gutterBottom>
        {props.text}
      </Typography>
    </TableCell>
  );
};

const RightCol: React.FC<Column> = (props) => {
  return <TableCell align="right">{props.text}</TableCell>;
};
const RowCmp: React.FC<Row> = (props) => {
  return (
    <>
      <TableRow>
        <Heading text={props.text} />
        <RightCol text={props.deduction || ''} />
        <RightCol text={props.actual || ''} />
      </TableRow>
    </>
  );
};

const Result: React.FC<FinalData> = (props) => {
  let splitUpRows = props.taxSplitUp.map((val, i) => {
    return (
      <React.Fragment key={i}>
        <RowCmp
          text={`${val.percentage}% of ${val.amt} is`}
          actual={val.taxedAmt}
        />
      </React.Fragment>
    );
  });
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <RowCmp
            text="Total Income"
            actual={props.totalIncome}
            deduction={0}
          />
          <RowCmp
            text="Tax excemption"
            actual={props.incomeAfterExcemption}
            deduction={constants.TAX_EXCEMPTION}
          />
          <RowCmp
            text="Conveyance"
            actual={props.incomeAfterConveyance}
            deduction={constants.CONVEYANCE}
          />
          <RowCmp
            text="Other Investments & Dedcutions"
            actual={props.incomeAfterDeduction}
            deduction={props.totalDeductions}
          />
          {splitUpRows}
          <RowCmp text="Tax Payable" actual={props.totalTaxPayable} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Result;
