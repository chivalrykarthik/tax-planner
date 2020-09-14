import { constants } from './CONSTANTS';
import { FinalData, Data } from './model';
class CalcTax {
  initialValue: Data;
  finalValue: FinalData = {
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
  constructor(initialValue: Data) {
    this.initialValue = initialValue;
  }
  setDefault() {
    this.finalValue.totalIncome = this.initialValue.income;
    this.finalValue.conveyance = constants.CONVEYANCE;
  }
  calculateDeduction() {
    // Calculating 80D
    if (
      this.initialValue.deduction80D &&
      Number(this.initialValue.deduction80D)
    ) {
      this.finalValue.totalDeductions += this.initialValue.deduction80D;
    }
    // Calculating other deductions 80DD etc...
    if (
      this.initialValue.deductionOther &&
      Number(this.initialValue.deductionOther)
    ) {
      this.finalValue.totalDeductions += this.initialValue.deductionOther;
    }
  }
  calculateInvestment() {
    if (this.initialValue.investment && Number(this.initialValue.investment)) {
      this.finalValue.totalInvestment +=
        this.initialValue.investment > constants.MAX_INVESTMENT
          ? constants.MAX_INVESTMENT
          : Number(this.initialValue.investment);
    }
  }
  calculateLoanInterest() {
    // Calculating loan interest
    if (
      this.initialValue.loanInterest &&
      Number(this.initialValue.loanInterest)
    ) {
      this.finalValue.totalLoanInterest +=
        this.initialValue.loanInterest > constants.MAX_LOAN_INTEREST
          ? constants.MAX_LOAN_INTEREST
          : this.initialValue.loanInterest;
    }
  }
  calculateIncomeAfterException() {
    this.finalValue.incomeAfterExcemption =
      constants.TAX_EXCEMPTION > this.finalValue.totalIncome
        ? 0
        : this.finalValue.totalIncome - constants.TAX_EXCEMPTION;
    console.log(
      'incomeAfterExcemptionww=====',
      this.finalValue.incomeAfterExcemption
    );
  }
  calculateIncomeAfterConveyance() {
    this.finalValue.incomeAfterConveyance =
      this.finalValue.incomeAfterExcemption > constants.CONVEYANCE
        ? this.finalValue.incomeAfterExcemption - constants.CONVEYANCE
        : 0;
    console.log(
      'incomeAfterConveyance=====',
      this.finalValue.incomeAfterConveyance
    );
  }
  calculateIncomeAfterDeductions() {
    let deductions =
      this.finalValue.totalInvestment +
      this.finalValue.totalDeductions +
      this.finalValue.totalLoanInterest;
    this.finalValue.incomeAfterDeduction =
      this.finalValue.incomeAfterConveyance > deductions
        ? this.finalValue.incomeAfterConveyance - deductions
        : 0;
    console.log(
      'incomeAfterDeduction=====',
      this.finalValue.incomeAfterDeduction
    );
  }
  roundIncome() {
    let diff = this.finalValue.incomeAfterDeduction % 10;
    let nearestRounded =
      diff > 5
        ? 10 - diff + this.finalValue.incomeAfterDeduction
        : this.finalValue.incomeAfterDeduction - diff;
    this.finalValue.incomeAfterDeduction = nearestRounded;
  }
  calculateTotal() {
    this.setDefault();
    this.calculateDeduction();
    this.calculateInvestment();
    this.calculateLoanInterest();
    this.calculateIncomeAfterException();
    this.calculateIncomeAfterConveyance();
    this.calculateIncomeAfterDeductions();
    this.roundIncome();
  }
  getPercentage(amt: number, percent: number): number {
    return (amt * percent) / 100;
  }
  calculateTaxPayable() {
    let taxableIncome = this.finalValue.incomeAfterDeduction;
    let tax: any[] = [];
    constants.TAX_LIMIT.reduce((acc, val, i) => {
      if (acc <= 0) return acc;
      let amt = 0;
      let prevLimit =
        i > 0 ? constants.TAX_LIMIT[i - 1] : constants.TAX_EXCEMPTION;
      let taxLimit = val === prevLimit ? val : val - prevLimit;
      console.log('taxLimitaaaaaa=' + taxLimit + 'accaaa=' + acc);
      if (acc > taxLimit) {
        amt = taxLimit;
        taxableIncome = acc - taxLimit;
      } else {
        amt = acc;
        taxableIncome = 0;
      }
      let taxedAmt: number = this.getPercentage(
        amt,
        constants.TAX_PERCENTAGE[i]
      );
      // taxedAmt += this.getPercentage(taxedAmt, constants.CESS);
      //tax.push(taxedAmt);
      tax.push({ taxedAmt, amt, percentage: constants.TAX_PERCENTAGE[i] });
      console.log('taxableIncome===', taxableIncome);
      return taxableIncome;
    }, taxableIncome);
    this.finalValue.totalTaxPayable = tax.reduce(
      (acc, val) => acc + val.taxedAmt,
      0
    );
    this.finalValue.taxSplitUp = tax;
  }
  calculateCessTaxPayable() {
    this.finalValue.totalTaxPayable =
      (this.finalValue.totalTaxPayable * constants.CESS) / 100;
  }
  getResult(): FinalData {
    return this.finalValue;
  }
}
export default CalcTax;

/*
let initialValue = {
  income: 1027195,
  investment: 150000,
  deduction80D: 4211,
  deductionOther: 2500,
  loanInterest: 182368,
};

const obj = new CalcTax(initialValue);
obj.calculateTotal();
obj.calculateTaxPayable();
//obj.calculateCessTaxPayable();
console.log(obj.getResult());
*/
