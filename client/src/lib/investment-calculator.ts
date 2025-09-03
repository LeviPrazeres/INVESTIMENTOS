import type { InvestmentResults, SimulationParams, MonthlyData } from "@/types/investment";

export function calculateInvestment(params: SimulationParams): InvestmentResults {
  const initial = params.initialValue;
  const monthly = params.monthlyContribution;
  const rate = params.interestRate / 100; // Convert percentage to decimal
  let periods = params.timePeriod;
  
  // Convert years to months if needed
  if (params.timeUnit === "years") {
    periods = periods * 12;
  }
  
  let currentBalance = initial;
  let totalInvested = initial;
  const monthlyData: MonthlyData[] = [];
  
  // Initial month (month 0)
  monthlyData.push({
    month: 0,
    contribution: initial,
    interest: 0,
    balance: currentBalance,
    totalInvested: totalInvested,
  });
  
  // Calculate month by month
  for (let month = 1; month <= periods; month++) {
    const interestEarned = currentBalance * rate;
    currentBalance += interestEarned + monthly;
    totalInvested += monthly;
    
    monthlyData.push({
      month: month,
      contribution: monthly,
      interest: interestEarned,
      balance: currentBalance,
      totalInvested: totalInvested,
    });
  }
  
  const totalInterest = currentBalance - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;
  
  return {
    finalAmount: currentBalance,
    totalInvested: totalInvested,
    interestEarned: totalInterest,
    returnPercentage: returnPercentage,
    monthlyData: monthlyData,
    periods: periods,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function formatPercentage(percentage: number): string {
  return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;
}
