import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartOverlay from "./components/CartOverlay";
import Index from "./pages/Index";
import Header from "./components/Header";
import { useState } from "react";
import { CartProvider } from './contexts/CartContext';

const queryClient = new QueryClient();
const categories = ["All", "Clothes", "Tech"];

const App = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryChange = (category: string) => {
    console.log("Changed to:", category);
    setActiveCategory(category);
  };

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <div className="relative">
            <Header
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<Index />} />
            </Routes>
            <CartOverlay />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
