import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CalendarCheck, PieChart, GraduationCap } from "lucide-react";

export default function InvestmentTips() {
  const tips = [
    {
      icon: Clock,
      title: "Comece Cedo",
      description: "O tempo é seu maior aliado nos investimentos. Quanto antes começar, maior será o efeito dos juros compostos.",
      color: "primary",
    },
    {
      icon: CalendarCheck,
      title: "Seja Consistente",
      description: "Aportes regulares, mesmo que pequenos, podem resultar em grandes montantes no longo prazo.",
      color: "success",
    },
    {
      icon: PieChart,
      title: "Diversifique",
      description: "Não coloque todos os ovos na mesma cesta. Diversifique seus investimentos para reduzir riscos.",
      color: "accent",
    },
    {
      icon: GraduationCap,
      title: "Eduque-se",
      description: "Continue aprendendo sobre investimentos. Conhecimento é a melhor ferramenta para boas decisões financeiras.",
      color: "muted",
    },
  ];

  return (
    <Card data-testid="card-investment-tips">
      <CardHeader>
        <CardTitle>Dicas de Investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            const colorClasses = {
              primary: "bg-primary/10 text-primary",
              success: "bg-success/10 text-success", 
              accent: "bg-accent/10 text-accent-foreground",
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
