import { Card, CardContent } from "@/components/ui/card";
import { Coins, HandHeart, TrendingUp, Info } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/investment-calculator";
import { getInvestmentType, getRiskColor } from "@/lib/investment-types";
import type { InvestmentResults, SimulationParams } from "@/types/investment";

interface ResultsSummaryProps {
  results: InvestmentResults | null;
  params: SimulationParams | null;
}

export default function ResultsSummary({ results, params }: ResultsSummaryProps) {
  if (!results) {
    return (
      <div className="space-y-6">
        {/* Investment Type Info Skeleton */}
        <Card className="animate-pulse">
          <CardContent className="p-4">
            <div className="h-16 bg-muted rounded"></div>
          </CardContent>
        </Card>
        
        {/* Results Cards Skeleton */}
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
      </div>
    );
  }

  const periodText = results.periods === 1 ? "mês" : "meses";
  const investmentType = params ? getInvestmentType(params.investmentType) : null;

  return (
    <div className="space-y-6">
      {/* Investment Type Info */}
      {investmentType && (
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start space-x-3 flex-1">
                <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary" data-testid="text-investment-type">
                    Investindo em: {investmentType.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{investmentType.description}</p>
                </div>
              </div>
              <div className="text-right space-y-1 flex-shrink-0">
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Risco:</span>
                  <span className={`text-xs font-medium whitespace-nowrap ${getRiskColor(investmentType.risk)}`} data-testid="text-risk-level">
                    {investmentType.risk}
                  </span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">Liquidez:</span>
                  <span className="text-xs font-medium whitespace-nowrap" data-testid="text-liquidity">
                    {investmentType.liquidity}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Results Cards */}
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
    </div>
  );
}