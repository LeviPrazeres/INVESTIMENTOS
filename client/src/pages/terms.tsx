import { Link } from 'wouter';
import { ArrowLeft, FileText, AlertTriangle, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function TermsPage() {
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
          
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Termos de Uso
              </h1>
              <p className="text-muted-foreground">
                Última atualização: Janeiro de 2024
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Aviso importante */}
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <div>
                  <CardTitle className="text-orange-800 dark:text-orange-200">
                    Importante: Ferramenta Educacional
                  </CardTitle>
                  <CardDescription className="text-orange-700 dark:text-orange-300">
                    Este simulador é apenas uma ferramenta educacional
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 dark:text-orange-200 font-medium">
                Os resultados apresentados são estimativas baseadas em cálculos matemáticos. 
                Investimentos reais envolvem riscos e as rentabilidades podem variar. 
                Sempre consulte um consultor financeiro qualificado antes de tomar decisões de investimento.
              </p>
            </CardContent>
          </Card>

          {/* Aceitação dos termos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                1. Aceitação dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ao utilizar o Simulador de Investimentos, você concorda com estes termos de uso. 
                Se você não concorda com qualquer parte destes termos, não deve usar nossa ferramenta.
              </p>
              <p className="text-muted-foreground">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                As alterações entrarão em vigor imediatamente após sua publicação.
              </p>
            </CardContent>
          </Card>

          {/* Finalidade da ferramenta */}
          <Card>
            <CardHeader>
              <CardTitle>2. Finalidade da Ferramenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                O Simulador de Investimentos é uma ferramenta educacional destinada a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Ensinar conceitos básicos de juros compostos</li>
                <li>Demonstrar como diferentes variáveis afetam investimentos</li>
                <li>Auxiliar no planejamento financeiro pessoal</li>
                <li>Promover educação financeira</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitações e isenção */}
          <Card>
            <CardHeader>
              <CardTitle>3. Limitações e Isenção de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Badge variant="destructive" className="mb-2">Importante</Badge>
                  <h4 className="font-semibold">Esta ferramenta NÃO é:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Consultoria financeira ou de investimentos</li>
                    <li>Recomendação para compra ou venda de ativos</li>
                    <li>Garantia de rentabilidade futura</li>
                    <li>Análise de risco de investimentos</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold">Isenção de Responsabilidade:</h4>
                  <p className="text-muted-foreground">
                    Não nos responsabilizamos por perdas financeiras resultantes de decisões 
                    baseadas nas simulações desta ferramenta. Investimentos envolvem riscos 
                    e rentabilidades passadas não garantem resultados futuros.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uso adequado */}
          <Card>
            <CardHeader>
              <CardTitle>4. Uso Adequado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Você concorda em usar a ferramenta apenas para fins educacionais e pessoais. É proibido:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Usar os resultados para aconselhar terceiros profissionalmente</li>
                <li>Copiar ou reproduzir o código da aplicação</li>
                <li>Tentar interferir no funcionamento da ferramenta</li>
                <li>Usar a ferramenta para atividades ilegais</li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                5. Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Sua privacidade é importante para nós:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Não coletamos dados pessoais identificáveis</li>
                <li>As simulações são processadas localmente no seu navegador</li>
                <li>Não armazenamos histórico de cálculos</li>
                <li>Podemos coletar dados de uso anônimos para melhorar a ferramenta</li>
              </ul>
            </CardContent>
          </Card>

          {/* Propriedade intelectual */}
          <Card>
            <CardHeader>
              <CardTitle>6. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Todo o conteúdo desta aplicação, incluindo textos, design, código e funcionalidades, 
                está protegido por direitos autorais. O uso da ferramenta não concede direitos 
                sobre a propriedade intelectual.
              </p>
            </CardContent>
          </Card>

          {/* Modificações */}
          <Card>
            <CardHeader>
              <CardTitle>7. Modificações no Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Reservamo-nos o direito de modificar, suspender ou descontinuar a ferramenta 
                a qualquer momento, sem aviso prévio. Também podemos atualizar funcionalidades 
                e corrigir erros conforme necessário.
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle>8. Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco.
              </p>
              <Link href="/contato">
                <Button data-testid="button-contact-terms">
                  Entrar em Contato
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Data de vigência */}
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Estes termos são efetivos a partir de <strong>1º de janeiro de 2024</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Versão 1.0 - Última atualização: Janeiro 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}