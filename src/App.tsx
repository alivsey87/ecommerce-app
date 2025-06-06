import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  );
  
}

export default App;
