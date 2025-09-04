import { Link } from 'wouter';
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    icon: DollarSign,
    title: "1. Valor Inicial",
    description: "Digite o valor que você tem para investir inicialmente",
    details: "Pode ser qualquer quantia: R$ 100, R$ 1.000 ou R$ 10.000. Se você ainda não tem dinheiro para investir, coloque R$ 0 e simule apenas com aportes mensais."
  },
  {
    icon: TrendingUp,
    title: "2. Aporte Mensal",
    description: "Valor que você pretende investir mensalmente",
    details: "Mesmo pequenos valores fazem diferença no longo prazo. R$ 50, R$ 100 ou R$ 500 por mês podem gerar resultados surpreendentes."
  },
  {
    icon: Calculator,
    title: "3. Taxa de Juros",
    description: "Taxa de retorno anual esperada do investimento",
    details: "Para referência: Poupança ~6%, CDB ~12%, Tesouro Selic ~13%, Fundos de ações ~15% (histórico). Use taxas realistas baseadas no tipo de investimento."
  },
  {
    icon: Clock,
    title: "4. Período",
    description: "Por quantos anos você pretende manter o investimento",
    details: "O tempo é o maior aliado dos juros compostos. Períodos mais longos permitem que os juros se multipliquem exponencialmente."
  }
];

const tips = [
  {
    title: "Comece pequeno, mas comece!",
    description: "É melhor investir R$ 50 por mês do que esperar ter R$ 10.000 para começar."
  },
  {
    title: "Consistência é fundamental",
    description: "Aportes regulares, mesmo pequenos, são mais eficazes que aportes grandes esporádicos."
  },
  {
    title: "Pense no longo prazo",
    description: "Os juros compostos mostram seu verdadeiro poder após 10-20 anos de investimento."
  },
  {
    title: "Diversifique suas simulações",
    description: "Teste diferentes cenários: conservador, moderado e otimista."
  }
];

export function HowToUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Simulador
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Como Usar o Simulador
          </h1>
          <p className="text-muted-foreground">
            Aprenda a usar nossa ferramenta para simular seus investimentos
          </p>
        </div>

        <div className="space-y-8">
          {/* Passo a passo */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Passo a Passo</h2>
            <div className="grid gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                          <CardDescription className="text-base">
                            {step.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Dicas */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Dicas Importantes</h2>
            <div className="grid gap-4">
              {tips.map((tip, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">
                        Dica {index + 1}
                      </Badge>
                      <div>
                        <h3 className="font-semibold mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Interpretando os resultados */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Interpretando os Resultados</h2>
            <Card>
              <CardHeader>
                <CardTitle>O que cada informação significa:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">Valor Total Investido</h4>
                  <p className="text-muted-foreground">
                    Soma do valor inicial + todos os aportes mensais realizados no período.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary">Rendimento em Juros</h4>
                  <p className="text-muted-foreground">
                    Quanto seus investimentos renderam apenas com os juros compostos.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary">Valor Final</h4>
                  <p className="text-muted-foreground">
                    Valor total acumulado: investimentos + rendimentos dos juros.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary">Gráfico de Crescimento</h4>
                  <p className="text-muted-foreground">
                    Mostra como seu dinheiro cresce ao longo do tempo. Note como a curva se torna mais íngreme nos últimos anos - esse é o poder dos juros compostos!
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Call to action */}
          <Card className="text-center">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Pronto para simular?</h3>
              <p className="text-muted-foreground mb-6">
                Agora que você sabe como usar, que tal fazer sua primeira simulação?
              </p>
              <Link href="/">
                <Button size="lg" data-testid="button-start-simulation">
                  Começar Simulação
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}