import { useEffect, useState } from "react";
import { getAreas } from "@services/areaService";
import { getEmpleados } from "@services/empleadoService";
import { getSalones } from "@services/salonService";
import { getOficinas } from "@services/oficinaService";
import Loader from "@components/Loader/Loader";
import ErrorMessage from "@components/Error/ErrorMessage";
import type { Area } from "@interfaces/area";
import type { Empleado } from "@interfaces/empleado";
import type { Salon } from "@interfaces/salon";
import type { Oficina } from "@interfaces/oficina";

export default function Reportes() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [salones, setSalones] = useState<Salon[]>([]);
    const [oficinas, setOficinas] = useState<Oficina[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>("salones");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [areasData, empleadosData, salonesData, oficinasData] =
                    await Promise.all([
                        getAreas(),
                        getEmpleados(),
                        getSalones(),
                        getOficinas(),
                    ]);
                setAreas(areasData);
                setEmpleados(empleadosData);
                setSalones(salonesData);
                setOficinas(oficinasData);
                console.log(empleadosData);
            } catch (err) {
                console.error("Error cargando reporte:", err);
                setErrors(["No se pudo generar el reporte. Intente más tarde."]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loader text="Generando reporte..." />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {/* Error Messages */}
            {errors.length > 0 && errors.map((err) => <ErrorMessage key={err} message={err} />)}

            {/* Report Title */}
            <h2 className="text-2xl font-semibold text-gray-800">📊 Reportes del Colegio Cambridge</h2>

            {/* Tabs */}
            <div className="flex space-x-4 mt-3">
                {["salones", "oficinas", "empleados"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded-md font-medium cursor-pointer ${activeTab === tab
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "salones" && "Áreas y Salones"}
                        {tab === "oficinas" && "Áreas y Oficinas"}
                        {tab === "empleados" && "Áreas y Empleados"}
                    </button>
                ))}
            </div>

            {/* Tab Salones */}
            <div className="mt-4">
                {activeTab === "salones" && (
                    <div>
                        {areas.length === 0 ? (
                            <p>No hay áreas registradas</p>
                        ) : (
                            areas.map((area) => {
                                const salonesArea = salones.filter(
                                    (s) => String(s.area?.id || s.area) === String(area.id)
                                );
                                return (
                                    <div key={area.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                        <h5 className="text-xl font-semibold text-gray-700">{area.nombre}</h5>
                                        {salonesArea.length === 0 ? (
                                            <p>No hay salones en esta área.</p>
                                        ) : (
                                            <ul className="list-disc pl-5">
                                                {salonesArea.map((s) => (
                                                    <li key={s.id}>{s.codigo}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* Tab Oficinas */}
                {activeTab === "oficinas" && (
                    <div>
                        {areas.length === 0 ? (
                            <p>No hay áreas registradas</p>
                        ) : (
                            areas.map((area) => {
                                const oficinasArea = oficinas.filter(
                                    (o) => String(o.area?.id || o.area) === String(area.id)
                                );
                                return (
                                    <div key={area.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                        <h5 className="text-xl font-semibold text-gray-700">{area.nombre}</h5>
                                        {oficinasArea.length === 0 ? (
                                            <p>No hay oficinas en esta área.</p>
                                        ) : (
                                            <ul className="list-disc pl-5">
                                                {oficinasArea.map((o) => (
                                                    <li key={o.id}>{o.codigo}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* Tab Empleados */}
                {activeTab === "empleados" && (
                    <div>
                        {areas.length === 0 ? (
                            <p>No hay áreas registradas</p>
                        ) : (
                            areas.map((area) => {
                                const empleadosArea = empleados
                                    .filter((e) => String(e.area?.id || e.area) === String(area.id))
                                    .map((e) => ({
                                        ...e,
                                        area: e.area?.nombre || e.area,
                                        oficina: e.oficina?.codigo || e.oficina,
                                    }));

                                return (
                                    <div key={area.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                                        <h5 className="text-xl font-semibold text-gray-700">{area.nombre}</h5>
                                        {empleadosArea.length === 0 ? (
                                            <p>No hay empleados en esta área.</p>
                                        ) : (
                                            <table className="min-w-full mt-3 border-collapse">
                                                <thead>
                                                    <tr>
                                                        <th className="border px-4 py-2 text-left">Nombre</th>
                                                        <th className="border px-4 py-2 text-left">Documento</th>
                                                        <th className="border px-4 py-2 text-left">Oficina</th>
                                                        <th className="border px-4 py-2 text-left">Tipo Empleado</th>
                                                        <th className="border px-4 py-2 text-left">Tipo Profesor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {empleadosArea.map((emp) => (
                                                        <tr key={emp.id}>
                                                            <td className="border px-4 py-2">{emp.nombre}</td>
                                                            <td className="border px-4 py-2">{emp.documento}</td>
                                                            <td className="border px-4 py-2">{typeof emp.oficina === "object" && emp.oficina !== null ? emp.oficina.codigo : emp.oficina}</td>
                                                            <td className="border px-4 py-2">{emp.tipoEmpleado}</td>
                                                            <td className="border px-4 py-2">
                                                                {emp.tipoProfesor ? emp.tipoProfesor : "N/A"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
