import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Lightbulb } from "lucide-react";
import { formatCurrency } from "@/lib/investment-calculator";
import { calculateInvestment } from "@/lib/investment-calculator";
import type { InvestmentResults, SimulationParams } from "@/types/investment";

interface ScenarioComparisonProps {
  currentResults: InvestmentResults | null;
  currentParams: SimulationParams | null;
}

export default function ScenarioComparison({ currentResults, currentParams }: ScenarioComparisonProps) {
  const [comparisonScenario, setComparisonScenario] = useState<InvestmentResults | null>(null);

  const generateComparisonScenario = () => {
    if (!currentParams) return;

    // Create a scenario without monthly contributions
    const noContributionsParams: SimulationParams = {
      ...currentParams,
      monthlyContribution: 0,
    };

    const comparisonResults = calculateInvestment(noContributionsParams);
    setComparisonScenario(comparisonResults);
  };

  if (!currentResults || !currentParams) {
    return null;
  }

  if (!comparisonScenario) {
    generateComparisonScenario();
  }

  const contributionDifference = currentResults.finalAmount - (comparisonScenario?.finalAmount || 0);
  const contributionPercentage = comparisonScenario 
    ? ((contributionDifference / currentResults.finalAmount) * 100) 
    : 0;

  return (
    <Card data-testid="card-scenario-comparison">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Comparação de Cenários</CardTitle>
          <Button
            size="sm"
            onClick={() => {}}
            data-testid="button-add-scenario"
          >
            <Plus className="mr-1 h-4 w-4" />
            Adicionar Cenário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Scenario */}
            <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-card-foreground">Cenário Atual</h4>
                <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                  Ativo
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa:</span>
                  <span className="font-medium" data-testid="text-scenario1-rate">
                    {currentParams.interestRate}% a.m.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Período:</span>
                  <span className="font-medium" data-testid="text-scenario1-period">
                    {currentParams.timePeriod} {currentParams.timeUnit === "months" ? "meses" : "anos"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Final:</span>
                  <span className="font-bold text-success" data-testid="text-scenario1-final">
                    {formatCurrency(currentResults.finalAmount)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Comparison Scenario */}
            <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors border-dashed">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-muted-foreground">Sem Aportes Mensais</h4>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  Comparação
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa:</span>
                  <span className="font-medium">{currentParams.interestRate}% a.m.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Período:</span>
                  <span className="font-medium">
                    {currentParams.timePeriod} {currentParams.timeUnit === "months" ? "meses" : "anos"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Final:</span>
                  <span className="font-bold text-card-foreground" data-testid="text-scenario2-final">
                    {comparisonScenario ? formatCurrency(comparisonScenario.finalAmount) : "Calculando..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comparison Insight */}
          {comparisonScenario && (
            <div className="bg-success/5 border border-success/20 rounded-lg p-4" data-testid="comparison-insight">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-success mt-1" />
                <div>
                  <h4 className="font-medium text-success mb-1">Insight de Comparação</h4>
                  <p className="text-sm text-muted-foreground">
                    Os aportes mensais representam{" "}
                    <strong className="text-success">
                      {contributionPercentage.toFixed(1)}%
                    </strong>{" "}
                    do valor final. Isso demonstra a importância da disciplina em investimentos regulares.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
