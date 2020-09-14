export interface Data {
  income: number;
  investment: number;
  deduction80D: number;
  deductionOther: number;
  loanInterest: number;
  loanOther: number;
}

export interface FinalData {
  totalIncome: number;
  totalInvestment: number;
  totalDeductions: number;
  totalExcemption: number;
  conveyance: number;
  totalLoanInterest: number;
  totalLoanOther: number;
  incomeAfterExcemption: number;
  incomeAfterConveyance: number;
  incomeAfterDeduction: number;
  totalTaxPayable: number;
  taxSplitUp: any[];
}
export interface Form {
  data: Data;
  handleChange?(e: any): any;
}
export interface Column {
  text?: string | number;
}

export interface Row extends Column {
  actual: string | number;
  deduction?: string | number;
}
