import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import { CartProvider } from '@/contexts/CartContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

import { AdminLayout } from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Orders from '@/pages/admin/Orders';

import { PainelLayout } from '@/components/layout/PainelLayout';
import PainelDashboard from '@/pages/painel/PainelDashboard';
import ManageProducts from '@/pages/painel/ManageProducts';
import ManageOrders from '@/pages/painel/ManageOrders';
import ManageBanners from '@/pages/painel/marketing/ManageBanners';
import ManageTrustBar from '@/pages/painel/marketing/ManageTrustBar';

import PreviewLoja from '@/pages/PreviewLoja';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="produtos" element={<Catalog />} />
              <Route path="produtos/:id" element={<ProductDetail />} />
              <Route path="carrinho" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="preview-importacao" element={<PreviewLoja />} />
            </Route>

            <Route path="/painel" element={<PainelLayout />}>
             <Route index element={<PainelDashboard />} />
             <Route path="produtos" element={<ManageProducts />} />
             <Route path="pedidos" element={<ManageOrders />} />
             <Route path="marketing/banners" element={<ManageBanners />} />
             <Route path="marketing/trustbar" element={<ManageTrustBar />} />
             <Route path="*" element={<div className="font-bold text-[var(--text-muted)] uppercase mt-10">Página em Construção</div>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </CartProvider>
   </ThemeProvider>
  );
}
