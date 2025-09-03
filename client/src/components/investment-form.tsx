import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calculator, Eraser } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { SimulationParams, QuickScenario } from "@/types/investment";

const formSchema = z.object({
  initialValue: z.number().min(0, "Valor inicial deve ser positivo"),
  monthlyContribution: z.number().min(0, "Aporte mensal deve ser positivo"),
  interestRate: z.number().min(0, "Taxa deve ser positiva").max(20, "Taxa muito alta (máx: 20%)"),
  timePeriod: z.number().min(1, "Período deve ser pelo menos 1").max(600, "Período muito longo"),
  timeUnit: z.enum(["months", "years"]).default("months"),
});

interface InvestmentFormProps {
  onCalculate: (params: SimulationParams) => void;
  onToggleDarkMode: () => void;
}

const quickScenarios: QuickScenario[] = [
  { name: "Conservador", initial: 5000, monthly: 1000, rate: 0.8, period: 24 },
  { name: "Moderado", initial: 10000, monthly: 2000, rate: 1.2, period: 36 },
  { name: "Arrojado", initial: 2000, monthly: 500, rate: 1.5, period: 60 },
  { name: "Longo Prazo", initial: 1000, monthly: 300, rate: 0.6, period: 120 },
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
    
    // Trigger calculation immediately
    onCalculate({
      initialValue: scenario.initial,
      monthlyContribution: scenario.monthly,
      interestRate: scenario.rate,
      timePeriod: scenario.period,
      timeUnit: "months",
    });
  };

  const handleClear = () => {
    form.reset();
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
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxa de Juros (% ao mês)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
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
