import { useState } from "react";
import InvestmentForm from "@/components/investment-form";
import ResultsSummary from "@/components/results-summary";
import InvestmentChart from "@/components/investment-chart";
import DetailedBreakdown from "@/components/detailed-breakdown";
import ScenarioComparison from "@/components/scenario-comparison";
import InvestmentTips from "@/components/investment-tips";
import { calculateInvestment } from "@/lib/investment-calculator";
import type { InvestmentResults, SimulationParams } from "@/types/investment";

export default function InvestmentSimulator() {
  const [results, setResults] = useState<InvestmentResults | null>(null);
  const [currentParams, setCurrentParams] = useState<SimulationParams | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = (params: SimulationParams) => {
    const calculationResults = calculateInvestment(params);
    setResults(calculationResults);
    setCurrentParams(params);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Initial calculation with default values
  if (!results) {
    const defaultParams: SimulationParams = {
      initialValue: 1000,
      monthlyContribution: 500,
      interestRate: 0.8,
      timePeriod: 12,
      timeUnit: "months",
    };
    handleCalculate(defaultParams);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1">
            <InvestmentForm onCalculate={handleCalculate} />
          </div>
          
          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Summary Cards */}
            <ResultsSummary results={results} />
            
            {/* Chart Section */}
            <InvestmentChart 
              results={results}
              showDetails={showDetails}
              onToggleDetails={toggleDetails}
            />
            
            {/* Detailed Breakdown */}
            <DetailedBreakdown 
              results={results} 
              isVisible={showDetails} 
            />
            
            {/* Scenario Comparison */}
            <ScenarioComparison 
              currentResults={results}
              currentParams={currentParams}
            />
            
            {/* Investment Tips */}
            <InvestmentTips />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-card-foreground mb-3">
                Simulador de Investimentos
              </h3>
              <p className="text-sm text-muted-foreground">
                Ferramenta educacional para simular o crescimento de investimentos com juros compostos. 
                Use como base para suas decisões financeiras.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-card-foreground mb-3">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Como usar</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sobre juros compostos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Glossário financeiro</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-card-foreground mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos de uso</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Simulador de Investimentos. Ferramenta educacional - não constitui consultoria financeira.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
