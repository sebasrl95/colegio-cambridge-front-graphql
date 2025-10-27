import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmpleado, createEmpleado, updateEmpleado } from "../../services/empleadoService";
import { getAreas } from "../../services/areaService";
import { getOficinas } from "../../services/oficinaService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";

export default function EmpleadoForm() {
    const [nombre, setNombre] = useState("");
    const [documento, setDocumento] = useState("");
    const [areaId, setAreaId] = useState("");
    const [oficinaId, setOficinaId] = useState("");
    const [tipoEmpleado, setTipoEmpleado] = useState("administrativo");
    const [tipoProfesor, setTipoProfesor] = useState("");
    const [areas, setAreas] = useState([]);
    const [oficinas, setOficinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [areasData, oficinasData] = await Promise.all([
                    getAreas(),
                    getOficinas(),
                ]);
                setAreas(areasData);
                setOficinas(oficinasData);

                if (id) {
                    const empleado = await getEmpleado(id);
                    setNombre(empleado.nombre);
                    setDocumento(empleado.documento);
                    setAreaId(String(empleado.area._id));
                    setOficinaId(String(empleado.oficina._id));
                    setTipoEmpleado(empleado.tipoEmpleado);
                    if (empleado.tipoEmpleado === "profesor") {
                        setTipoProfesor(empleado.tipoProfesor || "");
                    }
                }
            } catch (err) {
                console.error("Error al cargar formulario:", err);
                setError("No se pudo cargar la información del empleado.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                nombre,
                documento,
                area: areaId,
                oficina: oficinaId,
                tipoEmpleado,
            };

            if (tipoEmpleado === "profesor") {
                payload.tipoProfesor = tipoProfesor;
            }

            if (id) {
                await updateEmpleado(id, payload);
            } else {
                await createEmpleado(payload);
            }
            navigate("/empleados");
        } catch (err) {
            console.error("Error al guardar empleado:", err);
            setError("No se pudo guardar el empleado.");
        }
    };

    const handleCancel = () => {
        navigate("/empleados");
    };

    if (loading) return <Loader text="Cargando formulario..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar" : "Nuevo"} Empleado</h2>
            <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                {/* Documento */}
                <div className="mb-3">
                    <label>Documento</label>
                    <input
                        type="text"
                        className="form-control"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>

                {/* Área */}
                <div className="mb-3">
                    <label>Área</label>
                    {areas.length === 0 ? (
                        <ErrorMessage message={'No se encuentran áreas registradas.'} />
                    ) :
                        <select
                            className="form-select"
                            value={areaId}
                            onChange={(e) => setAreaId(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un área</option>
                            {areas.map((a) => (
                                <option key={a._id} value={String(a._id)}>
                                    {a.nombre}
                                </option>
                            ))}
                        </select>
                    }
                </div>

                {/* Oficina */}
                <div className="mb-3">
                    <label>Oficina</label>

                    {areas.length === 0 ? (
                        <ErrorMessage message={'No se encuentran oficinas registradas.'} />
                    ) :
                        <select
                            className="form-select"
                            value={oficinaId}
                            onChange={(e) => setOficinaId(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una oficina</option>
                            {oficinas.map((o) => (
                                <option key={o._id} value={String(o._id)}>
                                    {o.codigo}
                                </option>
                            ))}
                        </select>
                    }
                </div>

                {/* Tipo de Empleado */}
                <div className="mb-3">
                    <label>Tipo de Empleado</label>
                    <select
                        className="form-select"
                        value={tipoEmpleado}
                        onChange={(e) => setTipoEmpleado(e.target.value)}
                        required
                    >
                        <option value="administrativo">Administrativo</option>
                        <option value="profesor">Profesor</option>
                    </select>
                </div>

                {/* Tipo de Profesor (solo si es profesor) */}
                {tipoEmpleado === "profesor" && (
                    <div className="mb-3">
                        <label>Tipo de Profesor</label>
                        <select
                            className="form-select"
                            value={tipoProfesor}
                            onChange={(e) => setTipoProfesor(e.target.value)}
                            required
                        >
                            <option value="">Seleccione tipo de profesor</option>
                            <option value="planta">Planta</option>
                            <option value="contratista">Contratista</option>
                        </select>
                    </div>
                )}

                {/* Botones */}
                <button type="submit" className="btn btn-success me-2">
                    Guardar
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}
