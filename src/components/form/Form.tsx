import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { Income, Investment, Deductions, HomeLoan } from './SubCmp';
import TableCmp from './TableCmp';
import BtnSubmit from './BtnSubmit';
import { Data, FinalData } from './../../model';
import CalcTax from './../../calcTax';

let initialValue: Data = {
  income: 0,
  investment: 0,
  deduction80D: 0,
  deductionOther: 0,
  loanInterest: 0,
  loanOther: 0,
};
let finalValue: FinalData = {
  totalIncome: 0,
  totalDeductions: 0,
  totalExcemption: 0,
  conveyance: 0,
  totalInvestment: 0,
  totalLoanInterest: 0,
  totalLoanOther: 0,
  incomeAfterExcemption: 0,
  incomeAfterConveyance: 0,
  incomeAfterDeduction: 0,
  totalTaxPayable: 0,
  taxSplitUp: [],
};
const FormCmp = () => {
  let [ctc, setCtc] = useState<Data>(initialValue);
  let [finalData, setFinalData] = useState<FinalData>(finalValue);
  let handleChange = (e: any): any => {
    let name = e.target.name;
    let value = e.target.value;
    setCtc({ ...ctc, [name]: Number(value) });
  };
  let calculateTax = () => {
    let tax = new CalcTax(ctc);
    tax.calculateTotal();
    tax.calculateTaxPayable();
    let result: FinalData = tax.getResult();
    setFinalData(result);
  };
  return (
    <>
      <div style={{ margin: '5px' }}>
        <form>
          <Income data={ctc} handleChange={handleChange} />
          <Divider />
          <Investment data={ctc} handleChange={handleChange} />
          <Divider />
          <Deductions data={ctc} handleChange={handleChange} />
          <Divider />
          <HomeLoan data={ctc} handleChange={handleChange} />
          <BtnSubmit calculateTax={calculateTax} />
          <Divider />
          <TableCmp {...finalData} />
        </form>
      </div>
    </>
  );
};

export default FormCmp;
