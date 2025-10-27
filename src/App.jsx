import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import SalonList from "./components/Salon/SalonList.jsx";
import SalonForm from "./components/Salon/SalonForm.jsx";
import AreaList from "./components/Area/AreaList.jsx";
import AreaForm from "./components/Area/AreaForm.jsx";
import OficinaList from "./components/Oficina/OficinaList.jsx";
import OficinaForm from "./components/Oficina/OficinaForm.jsx";
import EmpleadoList from "./components/Empleado/EmpleadoList.jsx";
import EmpleadoForm from "./components/Empleado/EmpleadoForm.jsx";
import Reportes from "./components/Reportes/Reportes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rutas Area */}
        <Route path="/areas" element={<AreaList />} />
        <Route path="/areas/nuevo" element={<AreaForm />} />
        <Route path="/areas/editar/:id" element={<AreaForm />} />

        {/* Rutas Salon */}
        <Route path="/salones" element={<SalonList />} />
        <Route path="/salones/nuevo" element={<SalonForm />} />
        <Route path="/salones/editar/:id" element={<SalonForm />} />

        {/* Rutas Oficina */}
        <Route path="/oficinas" element={<OficinaList />} />
        <Route path="/oficinas/nuevo" element={<OficinaForm />} />
        <Route path="/oficinas/editar/:id" element={<OficinaForm />} />

        {/* Rutas Empleados */}
        <Route path="/empleados" element={<EmpleadoList />} />
        <Route path="/empleados/nuevo" element={<EmpleadoForm />} />
        <Route path="/empleados/editar/:id" element={<EmpleadoForm />} />

        {/* Rutas Reportes */}
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
