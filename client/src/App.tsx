
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./contexts/CartContext";
import { CartProvider } from "./contexts/CartContext";
import CartOverlay from "./components/CartOverlay";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const DebugInfo = () => {
  console.log('DebugInfo component is rendering');
  
  try {
    const { cartItems, isCartOpen } = useCart();
    console.log('DebugInfo - cartItems:', cartItems, 'isCartOpen:', isCartOpen);
    
    return (
      <div 
        className="fixed top-0 left-0 bg-red-500 text-white p-2 z-50 text-xs pointer-events-none"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          backgroundColor: 'red', 
          color: 'white', 
          padding: '8px', 
          zIndex: 9999,
          fontSize: '12px'
        }}
      >
        Debug: Cart Open = {isCartOpen.toString()}, Items = {cartItems.length}
      </div>
    );
  } catch (error) {
    console.error('DebugInfo error:', error);
    return (
      <div 
        className="fixed top-0 left-0 bg-red-500 text-white p-2 z-50 text-xs pointer-events-none"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          backgroundColor: 'red', 
          color: 'white', 
          padding: '8px', 
          zIndex: 9999,
          fontSize: '12px'
        }}
      >
        Debug: Error loading cart data
      </div>
    );
  }
};

const AppContent = () => {
  console.log('AppContent is rendering');
  console.log('AppContent is rendering - CartOverlay should be mounted');

  return (
    <div className="relative">
      <DebugInfo />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<Index />} />
      </Routes>
      <CartOverlay />
    </div>
  );
};

const App = () => {
  console.log('App component is rendering');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;