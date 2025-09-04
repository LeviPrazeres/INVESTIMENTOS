import { Link } from 'wouter';
import { ArrowLeft, TrendingUp, Calendar, DollarSign, BarChart3, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const examples = [
  {
    scenario: "Jovem Investidor",
    initialAmount: 1000,
    monthlyContribution: 200,
    rate: 12,
    years: 30,
    finalAmount: 692540,
    totalInvested: 73000
  },
  {
    scenario: "Planejamento Aposentadoria",
    initialAmount: 5000,
    monthlyContribution: 500,
    rate: 10,
    years: 25,
    finalAmount: 649596,
    totalInvested: 155000
  },
  {
    scenario: "Meta de Curto Prazo",
    initialAmount: 2000,
    monthlyContribution: 300,
    rate: 8,
    years: 5,
    finalAmount: 23431,
    totalInvested: 20000
  }
];

export function CompoundInterestPage() {
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
            Entendendo os Juros Compostos
          </h1>
          <p className="text-muted-foreground">
            A força mais poderosa do universo financeiro explicada de forma simples
          </p>
        </div>

        <div className="space-y-8">
          {/* O que são juros compostos */}
          <section>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">O que são Juros Compostos?</CardTitle>
                    <CardDescription>A base do crescimento exponencial</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Os juros compostos são o resultado de aplicar juros não apenas sobre o valor inicial investido, 
                  mas também sobre os juros acumulados dos períodos anteriores. É literalmente 
                  <strong className="text-primary"> "juros sobre juros"</strong>.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Fórmula Matemática:</h4>
                  <p className="font-mono text-sm bg-background px-3 py-2 rounded">
                    M = C × (1 + i)^t
                  </p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p><strong>M</strong> = Montante final</p>
                    <p><strong>C</strong> = Capital inicial</p>
                    <p><strong>i</strong> = Taxa de juros</p>
                    <p><strong>t</strong> = Tempo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Por que são poderosos */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Por que são tão Poderosos?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <CardTitle>Crescimento Exponencial</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Diferente dos juros simples que crescem linearmente, os juros compostos 
                    crescem exponencialmente, criando uma curva ascendente cada vez mais íngreme.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <CardTitle>O Tempo é seu Aliado</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Quanto mais tempo você deixa o dinheiro investido, mais dramático 
                    se torna o efeito dos juros compostos. Os últimos anos são os mais impactantes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Exemplos práticos */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Exemplos Práticos</h2>
            <div className="grid gap-6">
              {examples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        {example.scenario}
                      </CardTitle>
                      <Badge variant="secondary">{example.years} anos</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">INVESTIMENTO</h4>
                        <p>Inicial: <span className="font-semibold">R$ {example.initialAmount.toLocaleString()}</span></p>
                        <p>Mensal: <span className="font-semibold">R$ {example.monthlyContribution.toLocaleString()}</span></p>
                        <p>Taxa: <span className="font-semibold">{example.rate}% ao ano</span></p>
                        <p className="text-sm text-muted-foreground">
                          Total investido: R$ {example.totalInvested.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">RESULTADO</h4>
                        <p className="text-2xl font-bold text-primary">
                          R$ {example.finalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          Rendimento: <span className="font-semibold text-green-600">
                            R$ {(example.finalAmount - example.totalInvested).toLocaleString()}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Multiplicou por {(example.finalAmount / example.totalInvested).toFixed(1)}x
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Regras importantes */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Regras de Ouro</h2>
            <div className="grid gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Comece o quanto antes</h3>
                      <p className="text-muted-foreground">
                        Cada ano que você adia diminui drasticamente o potencial de crescimento. 
                        Começar aos 20 anos em vez de aos 30 pode dobrar seu patrimônio final.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Seja consistente</h3>
                      <p className="text-muted-foreground">
                        Aportes regulares, mesmo pequenos, são mais eficazes que grandes 
                        investimentos esporádicos. A disciplina vence o valor.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Paciência é fundamental</h3>
                      <p className="text-muted-foreground">
                        Os juros compostos mostram seu verdadeiro poder apenas no longo prazo. 
                        Nos primeiros anos, o crescimento pode parecer lento.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to action */}
          <Card className="text-center bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Veja o Poder na Prática</h3>
              <p className="text-muted-foreground mb-6">
                Use nosso simulador para ver como os juros compostos podem transformar 
                seus pequenos investimentos em grandes resultados
              </p>
              <Link href="/">
                <Button size="lg" data-testid="button-try-simulator">
                  Experimentar o Simulador
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}