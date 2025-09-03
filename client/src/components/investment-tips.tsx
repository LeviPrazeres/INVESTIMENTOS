import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarCheck, PieChart, GraduationCap, Shield, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

export default function InvestmentTips() {
  const tips = [
    {
      icon: Shield,
      title: "Conheça seu Perfil de Risco",
      description: "Investimentos de baixo risco (poupança, CDB) oferecem segurança. Renda variável tem maior potencial, mas também maior volatilidade.",
      color: "primary",
    },
    {
      icon: Clock,
      title: "Prazo dos Investimentos",
      description: "Tesouro Selic para emergência (liquidez diária), Tesouro IPCA+ para longo prazo, CDB para médio prazo.",
      color: "success",
    },
    {
      icon: DollarSign,
      title: "Impostos e Taxas",
      description: "LCI/LCA são isentas de IR. Tesouro Direto e CDB seguem tabela regressiva. Considere os custos na rentabilidade.",
      color: "accent",
    },
    {
      icon: TrendingUp,
      title: "Inflação e Rentabilidade Real",
      description: "Busque investimentos que rendam acima da inflação. Tesouro IPCA+ protege do aumento de preços.",
      color: "warning",
    },
    {
      icon: PieChart,
      title: "Diversificação Inteligente",
      description: "Combine renda fixa (estabilidade) com renda variável (crescimento). Ajuste conforme seu objetivo.",
      color: "secondary",
    },
    {
      icon: AlertTriangle,
      title: "Cuidado com Promessas Irreais",
      description: "Desconfie de rentabilidades muito altas sem risco. Se parece bom demais para ser verdade, provavelmente é.",
      color: "destructive",
    },
  ];

  return (
    <Card data-testid="card-investment-tips">
      <CardHeader>
        <CardTitle>Dicas de Investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            const colorClasses = {
              primary: "bg-primary/10 text-primary",
              success: "bg-success/10 text-success", 
              accent: "bg-accent/10 text-accent-foreground",
              warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
              secondary: "bg-secondary/10 text-secondary-foreground",
              destructive: "bg-destructive/10 text-destructive",
              muted: "bg-muted text-muted-foreground",
            };

            return (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${colorClasses[tip.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground text-sm mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
