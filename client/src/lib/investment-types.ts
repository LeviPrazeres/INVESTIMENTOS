import type { InvestmentType } from "@/types/investment";

export const investmentTypes: InvestmentType[] = [
  {
    id: "poupanca",
    name: "Poupança",
    description: "Investimento tradicional, isento de IR para pessoa física. Rendimento baixo mas garantido.",
    averageRate: 0.5,
    minRate: 0.3,
    maxRate: 0.7,
    risk: "Baixo",
    liquidity: "Imediata"
  },
  {
    id: "cdb",
    name: "CDB (Certificado de Depósito Bancário)",
    description: "Título emitido por bancos. Garantido pelo FGC até R$ 250.000. Boa opção para renda fixa.",
    averageRate: 1.0,
    minRate: 0.8,
    maxRate: 1.3,
    risk: "Baixo",
    liquidity: "Vencimento"
  },
  {
    id: "tesouro-selic",
    name: "Tesouro Selic",
    description: "Título público atrelado à taxa Selic. Baixo risco e liquidez diária.",
    averageRate: 0.9,
    minRate: 0.7,
    maxRate: 1.1,
    risk: "Baixo",
    liquidity: "Diária"
  },
  {
    id: "tesouro-ipca",
    name: "Tesouro IPCA+",
    description: "Título público que protege da inflação. Indicado para objetivos de longo prazo.",
    averageRate: 1.2,
    minRate: 0.9,
    maxRate: 1.5,
    risk: "Baixo",
    liquidity: "Diária"
  },
  {
    id: "lci-lca",
    name: "LCI/LCA",
    description: "Letras de Crédito Imobiliário/Agronegócio. Isentas de IR para pessoa física.",
    averageRate: 0.9,
    minRate: 0.7,
    maxRate: 1.2,
    risk: "Baixo",
    liquidity: "Vencimento"
  },
  {
    id: "fundos-renda-fixa",
    name: "Fundos de Renda Fixa",
    description: "Fundos que investem em títulos de renda fixa. Diversificação profissional.",
    averageRate: 0.8,
    minRate: 0.5,
    maxRate: 1.1,
    risk: "Baixo",
    liquidity: "Diária"
  },
  {
    id: "fundos-multimercado",
    name: "Fundos Multimercado",
    description: "Fundos com estratégias diversificadas. Podem investir em várias classes de ativos.",
    averageRate: 1.5,
    minRate: 0.5,
    maxRate: 2.5,
    risk: "Médio",
    liquidity: "Diária"
  },
  {
    id: "acoes",
    name: "Ações (Renda Variável)",
    description: "Investimento em empresas listadas na bolsa. Maior potencial de retorno e risco.",
    averageRate: 2.0,
    minRate: -1.0,
    maxRate: 4.0,
    risk: "Alto",
    liquidity: "Diária"
  },
  {
    id: "fiis",
    name: "Fundos Imobiliários (FIIs)",
    description: "Fundos que investem em imóveis. Distribuem dividendos mensais.",
    averageRate: 1.3,
    minRate: 0.3,
    maxRate: 2.5,
    risk: "Médio",
    liquidity: "Diária"
  }
];

export function getInvestmentType(id: string): InvestmentType | undefined {
  return investmentTypes.find(type => type.id === id);
}

export function getRiskColor(risk: InvestmentType["risk"]): string {
  switch (risk) {
    case "Baixo": return "text-success";
    case "Médio": return "text-yellow-600 dark:text-yellow-400";
    case "Alto": return "text-destructive";
    default: return "text-muted-foreground";
  }
}