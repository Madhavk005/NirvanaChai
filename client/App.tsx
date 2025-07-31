import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<PlaceholderPage title="About Us" description="Learn about our three generations of tea expertise and global sourcing story." />} />
            <Route path="/blog" element={<PlaceholderPage title="Ritual Journal" description="Discover tea wisdom, brewing guides, and stories from our global tea community." />} />
            <Route path="/community" element={<PlaceholderPage title="Community" description="Join our global tea family and share your tea moments with fellow enthusiasts." />} />
            <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Get in touch with our tea experts for personalized recommendations and support." />} />
            <Route path="/account" element={<PlaceholderPage title="My Account" description="Manage your orders, preferences, and tea journey with us." />} />
            <Route path="/cart" element={<PlaceholderPage title="Shopping Cart" description="Review your selected teas before completing your order." />} />
            <Route path="/faq" element={<PlaceholderPage title="FAQ" description="Find answers to common questions about our teas, shipping, and more." />} />
            <Route path="/shipping" element={<PlaceholderPage title="Shipping Info" description="Learn about our delivery options and shipping policies." />} />
            <Route path="/returns" element={<PlaceholderPage title="Returns" description="Information about our return and refund policies." />} />
            <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="How we protect and use your personal information." />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
