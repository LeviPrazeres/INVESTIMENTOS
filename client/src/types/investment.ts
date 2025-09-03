export interface MonthlyData {
  month: number;
  contribution: number;
  interest: number;
  balance: number;
  totalInvested: number;
}

export interface InvestmentResults {
  finalAmount: number;
  totalInvested: number;
  interestEarned: number;
  returnPercentage: number;
  monthlyData: MonthlyData[];
  periods: number;
}

export interface SimulationParams {
  initialValue: number;
  monthlyContribution: number;
  interestRate: number;
  timePeriod: number;
  timeUnit: "months" | "years";
}

export interface QuickScenario {
  name: string;
  initial: number;
  monthly: number;
  rate: number;
  period: number;
}
