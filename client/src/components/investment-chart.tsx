import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Download } from "lucide-react";
import { formatCurrency } from "@/lib/investment-calculator";
import type { InvestmentResults } from "@/types/investment";

interface InvestmentChartProps {
  results: InvestmentResults | null;
  showDetails: boolean;
  onToggleDetails: () => void;
}

// Chart.js types
declare global {
  interface Window {
    Chart: any;
  }
}

export default function InvestmentChart({ results, showDetails, onToggleDetails }: InvestmentChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    // Load Chart.js
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => {
        if (results) {
          initChart();
        }
      };
      document.head.appendChild(script);
    } else if (results) {
      initChart();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [results]);

  const initChart = () => {
    if (!chartRef.current || !results || !window.Chart) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const labels = results.monthlyData.map(d => d.month === 0 ? 'Início' : `Mês ${d.month}`);
    const totalInvestedData = results.monthlyData.map(d => d.totalInvested);
    const balanceData = results.monthlyData.map(d => d.balance);

    chartInstance.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Investido',
            data: totalInvestedData,
            borderColor: 'hsl(215, 28%, 17%)',
            backgroundColor: 'hsla(215, 28%, 17%, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: false,
          },
          {
            label: 'Valor com Juros',
            data: balanceData,
            borderColor: 'hsl(142, 76%, 36%)',
            backgroundColor: 'hsla(142, 76%, 36%, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: number) {
                return formatCurrency(value);
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  };

  const handleExport = () => {
    if (!results) return;
    
    let csvContent = "Mês,Aporte,Juros,Saldo Total,Total Investido\n";
    
    results.monthlyData.forEach(month => {
      csvContent += `${month.month},${month.contribution.toFixed(2)},${month.interest.toFixed(2)},${month.balance.toFixed(2)},${month.totalInvested.toFixed(2)}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'simulacao_investimento.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Evolução do Investimento</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onToggleDetails}
              data-testid="button-toggle-details"
            >
              {showDetails ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}
              {showDetails ? 'Ocultar Detalhes' : 'Visualizar Detalhes'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={!results}
              data-testid="button-export-data"
            >
              <Download className="mr-1 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-96">
          <canvas
            ref={chartRef}
            className="w-full h-full"
            data-testid="canvas-investment-chart"
          ></canvas>
        </div>
        
        {/* Chart Legend */}
        <div className="flex justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
            <span className="text-muted-foreground">Total Investido</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
            <span className="text-muted-foreground">Valor com Juros</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
