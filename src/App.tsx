import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import RawMaterialsPage from "./pages/RawMaterialsPage";
import SimulationPage from "./pages/SimulationPage";

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route
          path="/materials"
          element={<RawMaterialsPage />}
        />
        <Route
          path="/simulation"
          element={<SimulationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;