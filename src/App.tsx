import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pool from "./pages/Pool";
import Stake from "./pages/Stake";
import Tasks from "./pages/Tasks";
import USDC from "./pages/USDC";
import WETH from "./pages/WETH";
import WBTC from "./pages/WBTC";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/swap" element={<Index />} />
        <Route path="/pool" element={<Pool />} />
        <Route path="/stake" element={<Stake />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/usdc" element={<USDC />} />
        <Route path="/weth" element={<WETH />} />
        <Route path="/wbtc" element={<WBTC />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
