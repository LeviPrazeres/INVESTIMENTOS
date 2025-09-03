import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/investment-calculator";
import { calculateInvestment } from "@/lib/investment-calculator";
import { getInvestmentType, getRiskColor } from "@/lib/investment-types";
import AddScenarioDialog from "@/components/add-scenario-dialog";
import type { InvestmentResults, SimulationParams } from "@/types/investment";

interface ComparisonScenario {
  id: string;
  name: string;
  params: SimulationParams;
  results: InvestmentResults;
}

interface ScenarioComparisonProps {
  currentResults: InvestmentResults | null;
  currentParams: SimulationParams | null;
}

export default function ScenarioComparison({ currentResults, currentParams }: ScenarioComparisonProps) {
  const [scenarios, setScenarios] = useState<ComparisonScenario[]>([]);

  const addScenario = (scenarioData: SimulationParams & { name: string }) => {
    const { name, ...params } = scenarioData;
    const results = calculateInvestment(params);
    const newScenario: ComparisonScenario = {
      id: Date.now().toString(),
      name,
      params,
      results,
    };
    setScenarios(prev => [...prev, newScenario]);
  };

  const removeScenario = (id: string) => {
    setScenarios(prev => prev.filter(scenario => scenario.id !== id));
  };

  // Auto-generate "Sem Aportes" comparison when current params change
  useEffect(() => {
    if (!currentParams) return;
    
    // Check if "Sem Aportes" scenario already exists
    const hasNoContributionsScenario = scenarios.some(s => s.name === "Sem Aportes Mensais");
    
    if (!hasNoContributionsScenario) {
      const noContributionsParams: SimulationParams = {
        ...currentParams,
        monthlyContribution: 0,
      };
      
      addScenario({
        name: "Sem Aportes Mensais",
        ...noContributionsParams,
      });
    }
  }, [currentParams]);

  if (!currentResults || !currentParams) {
    return null;
  }

  const getBestScenario = () => {
    if (!currentResults || scenarios.length === 0) return null;
    
    const allScenarios = [{ name: "Cenário Atual", results: currentResults, params: currentParams }, ...scenarios];
    return allScenarios.reduce((best, current) => 
      current.results.finalAmount > best.results.finalAmount ? current : best
    );
  };

  const bestScenario = getBestScenario();

  return (
    <Card data-testid="card-scenario-comparison">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Comparação de Cenários</CardTitle>
          <AddScenarioDialog onAddScenario={addScenario} defaultValues={currentParams} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current Scenario */}
            <div className={`border rounded-lg p-4 hover:border-primary/50 transition-colors ${
              bestScenario?.name === "Cenário Atual" ? "border-success bg-success/5" : "border-border"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-card-foreground">Cenário Atual</h4>
                  {bestScenario?.name === "Cenário Atual" && (
                    <TrendingUp className="h-4 w-4 text-success" />
                  )}
                </div>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  Ativo
                </span>
              </div>
              
              {currentParams && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investimento:</span>
                    <span className="font-medium text-xs">
                      {getInvestmentType(currentParams.investmentType)?.name || "N/A"}
                    </span>
                  </div>
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
              )}
            </div>
            
            {/* Additional Scenarios */}
            {scenarios.map((scenario) => {
              const investmentType = getInvestmentType(scenario.params.investmentType);
              const isBest = bestScenario?.name === scenario.name;
              
              return (
                <div
                  key={scenario.id}
                  className={`border rounded-lg p-4 hover:border-primary/50 transition-colors ${
                    isBest ? "border-success bg-success/5" : "border-border border-dashed"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-card-foreground text-sm">{scenario.name}</h4>
                      {isBest && <TrendingUp className="h-4 w-4 text-success" />}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Comparação
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeScenario(scenario.id)}
                        className="h-6 w-6 p-0 hover:bg-destructive/10"
                        data-testid={`button-remove-scenario-${scenario.id}`}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investimento:</span>
                      <span className="font-medium text-xs">
                        {investmentType?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa:</span>
                      <span className="font-medium">
                        {scenario.params.interestRate}% a.m.
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Período:</span>
                      <span className="font-medium">
                        {scenario.params.timePeriod} {scenario.params.timeUnit === "months" ? "meses" : "anos"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor Final:</span>
                      <span className="font-bold text-card-foreground">
                        {formatCurrency(scenario.results.finalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Comparison Insights */}
          {scenarios.length > 0 && bestScenario && (
            <div className="bg-success/5 border border-success/20 rounded-lg p-4" data-testid="comparison-insight">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-success mt-1" />
                <div>
                  <h4 className="font-medium text-success mb-2">Insights de Comparação</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-success">Melhor cenário:</strong> {bestScenario.name} com{" "}
                      <strong className="text-success">
                        {formatCurrency(bestScenario.results.finalAmount)}
                      </strong>
                    </p>
                    
                    {scenarios.length > 1 && (
                      <p>
                        <strong className="text-primary">Diferença do melhor vs pior:</strong>{" "}
                        <strong className="text-primary">
                          {formatCurrency(
                            Math.max(...scenarios.map(s => s.results.finalAmount), currentResults.finalAmount) -
                            Math.min(...scenarios.map(s => s.results.finalAmount), currentResults.finalAmount)
                          )}
                        </strong>
                      </p>
                    )}
                    
                    <p className="italic">
                      Compare diferentes tipos de investimento para encontrar a melhor estratégia para seu perfil.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
