import { Link } from 'wouter';
import { ArrowLeft, Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

const glossaryData: GlossaryTerm[] = [
  {
    term: "Juros Compostos",
    definition: "Juros calculados sobre o capital inicial acrescido dos juros acumulados dos períodos anteriores. É o famoso 'juros sobre juros'.",
    category: "Básico",
    relatedTerms: ["Juros Simples", "Capitalização", "Montante"]
  },
  {
    term: "Juros Simples",
    definition: "Juros calculados apenas sobre o valor principal (inicial), sem considerar juros acumulados de períodos anteriores.",
    category: "Básico"
  },
  {
    term: "Taxa de Juros",
    definition: "Percentual aplicado sobre um valor em determinado período. Pode ser expressa ao mês, ao ano, etc.",
    category: "Básico"
  },
  {
    term: "Aporte",
    definition: "Valor adicional investido periodicamente, além do investimento inicial.",
    category: "Investimento"
  },
  {
    term: "Capitalização",
    definition: "Processo de incorporar os juros ao capital, para que passem a render juros nos períodos seguintes.",
    category: "Básico"
  },
  {
    term: "Montante",
    definition: "Valor total acumulado ao final de um período, incluindo capital inicial e juros.",
    category: "Básico"
  },
  {
    term: "CDB",
    definition: "Certificado de Depósito Bancário. Título de renda fixa emitido por bancos para captar recursos.",
    category: "Investimento"
  },
  {
    term: "Tesouro Direto",
    definition: "Programa do governo federal para venda de títulos públicos a pessoas físicas pela internet.",
    category: "Investimento"
  },
  {
    term: "Poupança",
    definition: "Aplicação financeira mais tradicional no Brasil, com rendimento baseado na Taxa Selic e TR.",
    category: "Investimento"
  },
  {
    term: "Inflação",
    definition: "Aumento geral dos preços na economia. Reduz o poder de compra do dinheiro ao longo do tempo.",
    category: "Economia"
  },
  {
    term: "Taxa Selic",
    definition: "Taxa básica de juros da economia brasileira, definida pelo Banco Central.",
    category: "Economia"
  },
  {
    term: "CDI",
    definition: "Certificado de Depósito Interbancário. Taxa de referência para empréstimos entre bancos.",
    category: "Economia"
  },
  {
    term: "Liquidez",
    definition: "Facilidade de converter um investimento em dinheiro. Alta liquidez = fácil conversão.",
    category: "Investimento"
  },
  {
    term: "Renda Fixa",
    definition: "Investimentos com regras de remuneração definidas no momento da aplicação.",
    category: "Investimento"
  },
  {
    term: "Renda Variável",
    definition: "Investimentos cuja remuneração não pode ser previamente determinada (ações, fundos, etc.).",
    category: "Investimento"
  },
  {
    term: "Diversificação",
    definition: "Estratégia de distribuir investimentos em diferentes ativos para reduzir riscos.",
    category: "Estratégia"
  },
  {
    term: "Perfil de Risco",
    definition: "Classificação do investidor baseada em sua tolerância a perdas: conservador, moderado ou arrojado.",
    category: "Estratégia"
  },
  {
    term: "Valor Presente",
    definition: "Valor atual de um dinheiro que será recebido no futuro, considerando uma taxa de desconto.",
    category: "Básico"
  },
  {
    term: "Valor Futuro",
    definition: "Valor que um investimento terá em uma data futura, considerando juros e tempo.",
    category: "Básico"
  },
  {
    term: "ROI",
    definition: "Return on Investment (Retorno sobre Investimento). Métrica que avalia a eficiência de um investimento.",
    category: "Métricas"
  }
];

const categories = ["Todos", "Básico", "Investimento", "Economia", "Estratégia", "Métricas"];

export function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredTerms = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Glossário Financeiro
              </h1>
              <p className="text-muted-foreground">
                Entenda os principais termos do mundo dos investimentos
              </p>
            </div>
          </div>

          {/* Barra de pesquisa e filtros */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar termos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-glossary"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`filter-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de termos */}
        <div className="space-y-4">
          {filteredTerms.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Nenhum termo encontrado para "{searchTerm}"
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTerms.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-primary">
                        {item.term}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base leading-relaxed">
                        {item.definition}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      {item.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                {item.relatedTerms && (
                  <CardContent className="pt-0">
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Termos relacionados:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.relatedTerms.map((relatedTerm, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {relatedTerm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Estatísticas */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Mostrando <span className="font-semibold">{filteredTerms.length}</span> de{" "}
                <span className="font-semibold">{glossaryData.length}</span> termos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to action */}
        <Card className="mt-8 text-center">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Pronto para investir?</h3>
            <p className="text-muted-foreground mb-6">
              Agora que você conhece os termos, que tal simular seus investimentos?
            </p>
            <Link href="/">
              <Button size="lg" data-testid="button-start-investing">
                Começar a Simular
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}