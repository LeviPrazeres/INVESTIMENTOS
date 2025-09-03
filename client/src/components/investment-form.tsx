import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calculator, Eraser, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { SimulationParams, QuickScenario } from "@/types/investment";
import { investmentTypes, getInvestmentType, getRiskColor } from "@/lib/investment-types";

const formSchema = z.object({
  initialValue: z.number().min(0, "Valor inicial deve ser positivo"),
  monthlyContribution: z.number().min(0, "Aporte mensal deve ser positivo"),
  interestRate: z.number().min(-2, "Taxa deve ser realista").max(20, "Taxa muito alta (máx: 20%)"),
  timePeriod: z.number().min(1, "Período deve ser pelo menos 1").max(600, "Período muito longo"),
  timeUnit: z.enum(["months", "years"]).default("months"),
  investmentType: z.string().min(1, "Selecione um tipo de investimento"),
});

interface InvestmentFormProps {
  onCalculate: (params: SimulationParams) => void;
  onToggleDarkMode: () => void;
}

const quickScenarios: QuickScenario[] = [
  { name: "Conservador", initial: 5000, monthly: 1000, rate: 0.8, period: 24, investmentType: "cdb" },
  { name: "Moderado", initial: 10000, monthly: 2000, rate: 1.2, period: 36, investmentType: "tesouro-ipca" },
  { name: "Arrojado", initial: 2000, monthly: 500, rate: 2.0, period: 60, investmentType: "acoes" },
  { name: "Longo Prazo", initial: 1000, monthly: 300, rate: 0.9, period: 120, investmentType: "tesouro-selic" },
];

export default function InvestmentForm({ onCalculate, onToggleDarkMode }: InvestmentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialValue: 1000,
      monthlyContribution: 500,
      interestRate: 0.8,
      timePeriod: 12,
      timeUnit: "months",
      investmentType: "cdb",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onCalculate(values);
  };

  const handleQuickScenario = (scenario: QuickScenario) => {
    form.setValue("initialValue", scenario.initial);
    form.setValue("monthlyContribution", scenario.monthly);
    form.setValue("interestRate", scenario.rate);
    form.setValue("timePeriod", scenario.period);
    form.setValue("timeUnit", "months");
    form.setValue("investmentType", scenario.investmentType);
    
    // Trigger calculation immediately
    onCalculate({
      initialValue: scenario.initial,
      monthlyContribution: scenario.monthly,
      interestRate: scenario.rate,
      timePeriod: scenario.period,
      timeUnit: "months",
      investmentType: scenario.investmentType,
    });
  };

  const handleClear = () => {
    form.reset();
  };

  const selectedInvestmentType = getInvestmentType(form.watch("investmentType"));

  const handleInvestmentTypeChange = (value: string) => {
    const investmentType = getInvestmentType(value);
    if (investmentType) {
      form.setValue("interestRate", investmentType.averageRate);
    }
  };

  return (
    <Card className="h-fit">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-6">
            <Calculator className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-card-foreground">Parâmetros da Simulação</h2>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="initialValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Inicial</FormLabel>
                    <FormControl>
                      <div className="currency-input">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          data-testid="input-initial-value"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyContribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aporte Mensal</FormLabel>
                    <FormControl>
                      <div className="currency-input">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          data-testid="input-monthly-contribution"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Investimento</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleInvestmentTypeChange(value);
                        }}
                        defaultValue={field.value}
                        data-testid="select-investment-type"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de investimento" />
                        </SelectTrigger>
                        <SelectContent>
                          {investmentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{type.name}</span>
                                <span className={`text-xs ${getRiskColor(type.risk)} ml-2`}>
                                  {type.risk}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedInvestmentType && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-sm">{selectedInvestmentType.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedInvestmentType.description}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Risco:</span>
                      <span className={`ml-1 font-medium ${getRiskColor(selectedInvestmentType.risk)}`}>
                        {selectedInvestmentType.risk}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Liquidez:</span>
                      <span className="ml-1 font-medium">{selectedInvestmentType.liquidity}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Taxa típica:</span>
                      <span className="ml-1 font-medium">
                        {selectedInvestmentType.averageRate.toFixed(2)}% a.m.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormLabel>Taxa de Juros (% ao mês)</FormLabel>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ajuste a taxa conforme suas expectativas para este investimento</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          min="-2"
                          max="20"
                          data-testid="input-interest-rate"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          %
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="600"
                        data-testid="input-time-period"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                        data-testid="radio-time-unit"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="months" id="months" />
                          <Label htmlFor="months" className="text-sm">Meses</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="years" id="years" />
                          <Label htmlFor="years" className="text-sm">Anos</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                data-testid="button-simulate-investment"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Simular Investimento
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={handleClear}
                data-testid="button-clear-data"
              >
                <Eraser className="mr-2 h-4 w-4" />
                Limpar Dados
              </Button>
            </form>
          </Form>
          
          {/* Quick Scenarios */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Cenários Rápidos</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickScenarios.map((scenario, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleQuickScenario(scenario)}
                  data-testid={`button-scenario-${scenario.name.toLowerCase().replace(' ', '-')}`}
                >
                  {scenario.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
  );
}