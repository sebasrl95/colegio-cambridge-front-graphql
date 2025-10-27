import { useEffect, useState } from "react";
import { getAreas } from "../../services/areaService";
import { getEmpleados } from "../../services/empleadoService";
import { getSalones } from "../../services/salonService";
import { getOficinas } from "../../services/oficinaService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";

export default function Reportes() {
    const [areas, setAreas] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [salones, setSalones] = useState([]);
    const [oficinas, setOficinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("salones");

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
            } catch (err) {
                console.error("Error cargando reporte:", err);
                setError("No se pudo generar el reporte. Intente más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loader text="Generando reporte..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>📊 Reportes del Colegio Cambridge</h2>

            {/* Tabs de Bootstrap */}
            <ul className="nav nav-tabs mt-3">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "salones" ? "active" : ""}`}
                        onClick={() => setActiveTab("salones")}
                    >
                        Áreas y Salones
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "oficinas" ? "active" : ""}`}
                        onClick={() => setActiveTab("oficinas")}
                    >
                        Áreas y Oficinas
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "empleados" ? "active" : ""}`}
                        onClick={() => setActiveTab("empleados")}
                    >
                        Áreas y Empleados
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-4">
                {/* TAB 1: Áreas y Salones */}
                {activeTab === "salones" && (
                    <div>
                        {areas.length === 0 ? (
                            <p>No hay áreas registradas</p>
                        ) : areas.map((area) => {
                            const salonesArea = salones.filter(
                                (s) => String(s.area?._id || s.area) === String(area._id)
                            );
                            return (
                                <div key={area._id} className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{area.nombre}</h5>
                                        {salonesArea.length === 0 ? (
                                            <p>No hay salones en esta área.</p>
                                        ) : (
                                            <ul>
                                                {salonesArea.map((s) => (
                                                    <li key={s._id}>{s.codigo}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* TAB 2: Áreas y Oficinas */}
                {activeTab === "oficinas" && (
                    <div>
                        {areas.length === 0 ? (
                            <p>No hay áreas registradas</p>
                        ) : areas.map((area) => {
                            const oficinasArea = oficinas.filter(
                                (o) => String(o.area?._id || o.area) === String(area._id)
                            );
                            return (
                                <div key={area._id} className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{area.nombre}</h5>
                                        {oficinasArea.length === 0 ? (
                                            <p>No hay oficinas en esta área.</p>
                                        ) : (
                                            <ul>
                                                {oficinasArea.map((o) => (
                                                    <li key={o._id}>{o.codigo}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* TAB 3: Áreas y Empleados */}
                {activeTab === "empleados" && (
                    <div>
                        {areas.length === 0 ? (
                            <p>No hay áreas registradas</p>
                        ) : areas.map((area) => {
                            const empleadosArea = empleados
                                .filter(
                                    (e) => String(e.area?._id || e.area) === String(area._id)
                                )
                                .map((e) => ({
                                    ...e,
                                    area: e.area?.nombre || e.area,
                                    oficina: e.oficina?.codigo || e.oficina,
                                }));

                            return (
                                <div key={area._id} className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{area.nombre}</h5>
                                        {empleadosArea.length === 0 ? (
                                            <p>No hay empleados en esta área.</p>
                                        ) : (
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Documento</th>
                                                        <th>Oficina</th>
                                                        <th>Tipo Empleado</th>
                                                        <th>Tipo Profesor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {empleadosArea.map((emp) => (
                                                        <tr key={emp._id}>
                                                            <td>{emp.nombre}</td>
                                                            <td>{emp.documento}</td>
                                                            <td>{emp.oficina}</td>
                                                            <td>{emp.tipoEmpleado}</td>
                                                            <td>
                                                                {emp.tipoEmpleado === "profesor"
                                                                    ? emp.tipoProfesor
                                                                    : "-"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
