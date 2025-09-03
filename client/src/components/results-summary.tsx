import { Card, CardContent } from "@/components/ui/card";
import { Coins, HandHeart, TrendingUp } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/investment-calculator";
import type { InvestmentResults } from "@/types/investment";

interface ResultsSummaryProps {
  results: InvestmentResults | null;
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  if (!results) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-12 bg-muted rounded mb-3"></div>
              <div className="h-8 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const periodText = results.periods === 1 ? "mês" : "meses";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-success/10 p-2 rounded-lg">
              <Coins className="h-6 w-6 text-success" />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Valor Final</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-success" data-testid="text-final-amount">
            {formatCurrency(results.finalAmount)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Após <span data-testid="text-total-months">{results.periods} {periodText}</span>
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <HandHeart className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Investido</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-primary" data-testid="text-total-invested">
            {formatCurrency(results.totalInvested)}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Capital + Aportes</p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-accent/10 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Juros Ganhos</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-accent-foreground" data-testid="text-interest-earned">
            {formatCurrency(results.interestEarned)}
          </p>
          <p className="text-sm text-success mt-2">
            <span data-testid="text-return-percentage">
              {formatPercentage(results.returnPercentage)}
            </span>{" "}
            de rentabilidade
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
