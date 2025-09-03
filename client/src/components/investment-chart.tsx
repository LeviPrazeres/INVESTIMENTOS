import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/investment-calculator";
import { getInvestmentType } from "@/lib/investment-types";
import type { InvestmentResults, SimulationParams } from "@/types/investment";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface InvestmentChartProps {
  results: InvestmentResults | null;
  params: SimulationParams | null;
  showDetails: boolean;
  onToggleDetails: () => void;
}

// Chart.js types
declare global {
  interface Window {
    Chart: any;
  }
}

export default function InvestmentChart({ results, params, showDetails, onToggleDetails }: InvestmentChartProps) {
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
    if (!results || !params) return;
    
    const doc = new jsPDF();
    const investmentType = getInvestmentType(params.investmentType);
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('📈 Relatório de Simulação de Investimento', 20, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado em: ${currentDate}`, 20, 35);
    
    // Investment Information
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('📊 Informações da Simulação', 20, 50);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const investmentInfo = [
      ['Tipo de Investimento:', investmentType?.name || 'N/A'],
      ['Valor Inicial:', formatCurrency(params.initialValue)],
      ['Aporte Mensal:', formatCurrency(params.monthlyContribution)],
      ['Taxa de Juros:', `${params.interestRate}% ao mês`],
      ['Período:', `${params.timePeriod} ${params.timeUnit === 'months' ? 'meses' : 'anos'}`],
      ['Risco:', investmentType?.risk || 'N/A'],
      ['Liquidez:', investmentType?.liquidity || 'N/A']
    ];
    
    let yPos = 60;
    investmentInfo.forEach(([label, value]) => {
      doc.text(label, 20, yPos);
      doc.text(value, 80, yPos);
      yPos += 7;
    });
    
    // Results Summary
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('💰 Resumo dos Resultados', 20, yPos + 10);
    
    yPos += 20;
    doc.setFontSize(10);
    const resultsSummary = [
      ['Valor Final:', formatCurrency(results.finalAmount)],
      ['Total Investido:', formatCurrency(results.totalInvested)],
      ['Juros Ganhos:', formatCurrency(results.interestEarned)],
      ['Rentabilidade:', `${results.returnPercentage.toFixed(2)}%`]
    ];
    
    resultsSummary.forEach(([label, value]) => {
      doc.text(label, 20, yPos);
      doc.setFontSize(11);
      doc.text(value, 80, yPos);
      doc.setFontSize(10);
      yPos += 7;
    });
    
    // Monthly Evolution Table
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('📈 Evolução Mensal', 20, yPos + 15);
    
    const tableData = results.monthlyData.slice(0, 50).map(month => [
      month.month === 0 ? 'Inicial' : month.month.toString(),
      formatCurrency(month.contribution),
      formatCurrency(month.interest),
      formatCurrency(month.balance),
      formatCurrency(month.totalInvested)
    ]);
    
    doc.autoTable({
      startY: yPos + 25,
      head: [['Mês', 'Aporte', 'Juros', 'Saldo Total', 'Total Investido']],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      margin: { left: 20, right: 20 }
    });
    
    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Simulador de Investimentos - Este relatório é apenas para fins educacionais', 20, pageHeight - 20);
    doc.text('Não constitui consultoria financeira ou recomendação de investimento', 20, pageHeight - 15);
    
    // Save PDF
    doc.save(`relatorio-investimento-${currentDate.replace(/\//g, '-')}.pdf`);
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
              <FileText className="mr-1 h-4 w-4" />
              Exportar PDF
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
