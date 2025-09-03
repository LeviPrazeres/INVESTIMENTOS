import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/investment-calculator";
import type { InvestmentResults } from "@/types/investment";

interface DetailedBreakdownProps {
  results: InvestmentResults | null;
  isVisible: boolean;
}

export default function DetailedBreakdown({ results, isVisible }: DetailedBreakdownProps) {
  if (!results || !isVisible) {
    return null;
  }

  const periodText = results.periods === 1 ? "mês" : "meses";
  const effectiveAnnualRate = Math.pow(1 + (results.monthlyData[1]?.interest || 0) / results.monthlyData[0]?.balance, 12) - 1;
  const averageMonthlyReturn = results.interestEarned / results.periods;

  return (
    <Card data-testid="card-detailed-breakdown">
      <CardHeader>
        <CardTitle>Análise Detalhada por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="table-monthly-breakdown">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Mês</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Aporte</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Juros</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Saldo Total</th>
              </tr>
            </thead>
            <tbody>
              {results.monthlyData.slice(1).map((month) => (
                <tr
                  key={month.month}
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                  data-testid={`row-month-${month.month}`}
                >
                  <td className="py-3 px-2 font-medium">{month.month}</td>
                  <td className="py-3 px-2 text-right text-primary">
                    {formatCurrency(month.contribution)}
                  </td>
                  <td className="py-3 px-2 text-right text-success">
                    {formatCurrency(month.interest)}
                  </td>
                  <td className="py-3 px-2 text-right font-semibold">
                    {formatCurrency(month.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-muted rounded-lg" data-testid="summary-projection">
          <h4 className="font-semibold text-card-foreground mb-2">Resumo da Projeção</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Período</p>
              <p className="font-semibold" data-testid="text-period">
                {results.periods} {periodText}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Taxa Efetiva Anual</p>
              <p className="font-semibold" data-testid="text-effective-rate">
                {(effectiveAnnualRate * 100).toFixed(2)}% a.a.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total de Aportes</p>
              <p className="font-semibold text-primary" data-testid="text-total-contributions">
                {formatCurrency(results.totalInvested - results.monthlyData[0].contribution)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Rendimento Médio/Mês</p>
              <p className="font-semibold text-success" data-testid="text-average-return">
                {formatCurrency(averageMonthlyReturn)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
