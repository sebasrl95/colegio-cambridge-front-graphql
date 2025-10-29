import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmpleado, createEmpleado, updateEmpleado } from "@services/empleadoService";
import { getAreas } from "@services/areaService";
import { getOficinas } from "@services/oficinaService";
import { Save, X } from 'lucide-react';
import Loader from "@components/Loader/Loader";
import ErrorMessage from "@components/Error/ErrorMessage";
import type { TipoEmpleado, TipoProfesor } from "@interfaces/empleado";
import type { Area } from "@interfaces/area";
import type { Oficina } from "@interfaces/oficina";

export default function EmpleadoForm() {
    const [nombre, setNombre] = useState<string>("");
    const [documento, setDocumento] = useState<string>("");
    const [areaId, setAreaId] = useState<string>("");
    const [oficinaId, setOficinaId] = useState<string>("");
    const [tipoEmpleado, setTipoEmpleado] = useState<TipoEmpleado>("administrativo");
    const [tipoProfesor, setTipoProfesor] = useState<TipoProfesor>("" as TipoProfesor);
    const [areas, setAreas] = useState<Area[]>([]);
    const [oficinas, setOficinas] = useState<Oficina[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);
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
                    setAreaId(String(empleado.area?.id) || "");
                    setOficinaId(String(empleado.oficina?.id) || "");
                    setTipoEmpleado(empleado.tipoEmpleado || "administrativo");
                    if (empleado.tipoEmpleado === "profesor") {
                        setTipoProfesor((empleado.tipoProfesor) || "planta");
                    }
                }
            } catch (err) {
                console.error("Error al cargar formulario:", err);
                setErrors(["No se pudo cargar la información del empleado."]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload = {
                nombre: nombre,
                documento: documento,
                area: areaId,
                oficina: oficinaId,
                tipoEmpleado: tipoEmpleado,
                tipoProfesor: tipoEmpleado === "profesor" ? tipoProfesor : undefined,
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
        } catch (err: PromiseLike<unknown> | unknown) {
            console.error("Error al procesar empleado", err);
            const axiosLike = err as { response?: { data?: { message?: string[] | string } } } | undefined;
            if (axiosLike?.response?.data?.message) {
                const msg = axiosLike.response.data.message;
                setErrors(Array.isArray(msg) ? msg : [msg]);
            } else if (err instanceof Error) {
                setErrors([err.message]);
            } else {
                setErrors(["Error al procesar la solicitud"]);
            }
        }
    };

    const handleCancel = () => {
        navigate("/empleados");
    };

    if (loading) return <Loader text="Cargando formulario..." />;

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{id ? "Editar" : "Nuevo"} Empleado</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="documento" className="block text-sm font-medium text-gray-700">Documento</label>
                    <input
                        id="documento"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="areaSelect">Área</label>
                    {areas.length === 0 ? (
                        <ErrorMessage message={'No se encuentran áreas registradas.'} />
                    ) :
                        <select
                            id="areaSelect"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={areaId}
                            onChange={(e) => setAreaId(e.target.value)}
                            required>
                            <option value="">Seleccione un área</option>
                            {areas.map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.nombre}
                                </option>
                            ))}
                        </select>
                    }
                </div>

                <div className="mb-3">
                    <label htmlFor="oficinaSelect">Oficina</label>

                    {areas.length === 0 ? (
                        <ErrorMessage message={'No se encuentran oficinas registradas.'} />
                    ) :
                        <select
                            id="oficinaSelect"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={oficinaId}
                            onChange={(e) => setOficinaId(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una oficina</option>
                            {oficinas.map((o) => (
                                <option key={o.id} value={String(o.id)}>
                                    {o.codigo}
                                </option>
                            ))}
                        </select>
                    }
                </div>

                <div className="mb-3">
                    <label htmlFor="tipoEmpleadoSelect">Tipo Empleado</label>
                    <select
                        id="tipoEmpleadoSelect"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={tipoEmpleado}
                        onChange={(e) => setTipoEmpleado(e.target.value as TipoEmpleado)}
                        required
                    >
                        <option value="administrativo">Administrativo</option>
                        <option value="profesor">Profesor</option>
                    </select>
                </div>

                {tipoEmpleado === "profesor" && (
                    <div className="mb-3">
                        <label htmlFor="tipoProfesor">Tipo de Profesor</label>
                        <select
                            id="tipoProfesor"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={tipoProfesor}
                            onChange={(e) => setTipoProfesor(e.target.value as TipoProfesor)}
                            required
                        >
                            <option value="">Seleccione tipo de profesor</option>
                            <option value="planta">Planta</option>
                            <option value="contratista">Contratista</option>
                        </select>
                    </div>
                )}

                <div className="flex space-x-2">
                    <button type="submit" className="inline-flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 cursor-pointer">
                        <Save size={16} />
                        <span className="ml-2">Guardar</span>
                    </button>
                    <button type="button" className="inline-flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 cursor-pointer" onClick={handleCancel}>
                        <X size={16} />
                        <span className="ml-2">Cancelar</span>
                    </button>
                </div>
            </form>
            {errors.length > 0 && errors.map((err) => (
                <ErrorMessage message={err} />
            ))}
        </div>
    );
}
