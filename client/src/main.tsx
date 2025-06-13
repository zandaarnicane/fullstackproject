import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { CartProvider } from './contexts/CartContext'; // pielāgo ceļu, ja mape ir 'context' nevis 'contexts'

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
  </CartProvider>
);
