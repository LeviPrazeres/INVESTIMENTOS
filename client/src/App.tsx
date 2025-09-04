import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import InvestmentSimulator from "@/pages/investment-simulator.tsx";
import { FAQPage } from "@/pages/faq";
import { HowToUsePage } from "@/pages/how-to-use";
import { CompoundInterestPage } from "@/pages/compound-interest";
import { GlossaryPage } from "@/pages/glossary";
import { ContactPage } from "@/pages/contact";
import { TermsPage } from "@/pages/terms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={InvestmentSimulator} />
      <Route path="/simulator" component={InvestmentSimulator} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/como-usar" component={HowToUsePage} />
      <Route path="/juros-compostos" component={CompoundInterestPage} />
      <Route path="/glossario" component={GlossaryPage} />
      <Route path="/contato" component={ContactPage} />
      <Route path="/termos" component={TermsPage} />
      <Route>
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Página não encontrada
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              A página que você está procurando não existe.
            </p>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
