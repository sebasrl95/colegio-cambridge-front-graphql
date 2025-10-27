import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "@components/Navbar/Navbar";
import Home from '@components/Home/Home';
import AreaForm from '@components/Area/AreaForm';
import AreaList from '@components/Area/AreaList';
import EmpleadoForm from '@components/Empleado/EmpleadoForm';
import EmpleadoList from '@components/Empleado/EmpleadoList';
import OficinaForm from '@components/Oficina/OficinaForm';
import OficinaList from '@components/Oficina/OficinaList';
import Reportes from '@components/Reportes/Reportes';
import SalonForm from '@components/Salon/SalonForm';
import SalonList from '@components/Salon/SalonList';
import './App.css'

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
  )
}

export default App
