import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Como funciona o cálculo de juros compostos?",
    answer: "Os juros compostos são calculados sobre o valor principal inicial mais os juros acumulados dos períodos anteriores. A fórmula é: M = C × (1 + i)^t, onde M é o montante final, C é o capital inicial, i é a taxa de juros e t é o tempo."
  },
  {
    question: "Qual a diferença entre juros simples e compostos?",
    answer: "Nos juros simples, os juros são calculados apenas sobre o valor inicial. Nos juros compostos, os juros são calculados sobre o valor inicial mais os juros acumulados, gerando o famoso 'juros sobre juros'."
  },
  {
    question: "Como usar o simulador?",
    answer: "Preencha o valor inicial do investimento, a contribuição mensal (se houver), a taxa de juros anual e o período em anos. O simulador calculará automaticamente o crescimento do seu investimento."
  },
  {
    question: "Os resultados são garantidos?",
    answer: "Não. Este é um simulador educacional que mostra projeções baseadas em taxas fixas. Investimentos reais envolvem riscos e as taxas podem variar. Sempre consulte um consultor financeiro para decisões de investimento."
  },
  {
    question: "Posso considerar a inflação no cálculo?",
    answer: "Atualmente o simulador trabalha com valores nominais. Para considerar a inflação, você pode usar uma taxa de juros real (taxa nominal - inflação) nos seus cálculos."
  },
  {
    question: "Qual é a importância de começar a investir cedo?",
    answer: "Quanto mais cedo você começar, mais tempo seus juros terão para se compor. Mesmo pequenos valores investidos por longos períodos podem resultar em quantias significativas devido ao poder dos juros compostos."
  },
  {
    question: "Que tipos de investimento posso simular?",
    answer: "Você pode simular qualquer investimento que tenha uma taxa de retorno anual estimada: poupança, CDBs, fundos de investimento, ações (com expectativa de retorno), tesouro direto, etc."
  },
  {
    question: "Como interpretar os gráficos?",
    answer: "O gráfico mostra a evolução do seu investimento ao longo do tempo. A linha azul representa o total acumulado, permitindo visualizar como os juros compostos aceleram o crescimento com o tempo."
  }
];

export function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
            Perguntas Frequentes
          </h1>
          <p className="text-muted-foreground">
            Tire suas dúvidas sobre investimentos e como usar o simulador
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {item.question}
                  </CardTitle>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              
              {openItems.includes(index) && (
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-relaxed">
                    {item.answer}
                  </CardDescription>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Não encontrou sua pergunta?</CardTitle>
            <CardDescription>
              Ainda tem dúvidas? Entre em contato conosco
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/contato">
              <Button data-testid="button-contact">
                Entrar em Contato
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}