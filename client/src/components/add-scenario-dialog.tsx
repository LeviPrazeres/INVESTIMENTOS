import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { investmentTypes, getInvestmentType } from "@/lib/investment-types";
import type { SimulationParams } from "@/types/investment";

const scenarioSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  initialValue: z.number().min(0, "Valor inicial deve ser positivo"),
  monthlyContribution: z.number().min(0, "Aporte mensal deve ser positivo"),
  interestRate: z.number().min(-2, "Taxa deve ser realista").max(20, "Taxa muito alta"),
  timePeriod: z.number().min(1, "Período deve ser pelo menos 1").max(600, "Período muito longo"),
  timeUnit: z.enum(["months", "years"]).default("months"),
  investmentType: z.string().min(1, "Selecione um tipo de investimento"),
});

interface AddScenarioDialogProps {
  onAddScenario: (scenario: SimulationParams & { name: string }) => void;
  defaultValues?: Partial<SimulationParams>;
}

export default function AddScenarioDialog({ onAddScenario, defaultValues }: AddScenarioDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof scenarioSchema>>({
    resolver: zodResolver(scenarioSchema),
    defaultValues: {
      name: "",
      initialValue: defaultValues?.initialValue || 1000,
      monthlyContribution: defaultValues?.monthlyContribution || 500,
      interestRate: defaultValues?.interestRate || 0.8,
      timePeriod: defaultValues?.timePeriod || 12,
      timeUnit: defaultValues?.timeUnit || "months",
      investmentType: defaultValues?.investmentType || "cdb",
    },
  });

  const handleInvestmentTypeChange = (value: string) => {
    const investmentType = getInvestmentType(value);
    if (investmentType) {
      form.setValue("interestRate", investmentType.averageRate);
    }
  };

  const onSubmit = (values: z.infer<typeof scenarioSchema>) => {
    onAddScenario(values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" data-testid="button-add-scenario">
          <Plus className="mr-1 h-4 w-4" />
          Adicionar Cenário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cenário</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cenário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Tesouro IPCA+ 10 anos"
                      data-testid="input-scenario-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          data-testid="input-scenario-initial-value"
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
                          data-testid="input-scenario-monthly-contribution"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      data-testid="select-scenario-investment-type"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de investimento" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          min="-2"
                          max="20"
                          data-testid="input-scenario-interest-rate"
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
                        data-testid="input-scenario-time-period"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      data-testid="radio-scenario-time-unit"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="months" id="scenario-months" />
                        <Label htmlFor="scenario-months" className="text-sm">Meses</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="years" id="scenario-years" />
                        <Label htmlFor="scenario-years" className="text-sm">Anos</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-testid="button-cancel-scenario"
              >
                Cancelar
              </Button>
              <Button type="submit" data-testid="button-save-scenario">
                Adicionar Cenário
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}