import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { getEmpleados, deleteEmpleado } from "@services/empleadoService";
import Loader from "@components/Loader/Loader";
import ErrorMessage from "@components/Error/ErrorMessage";
import type { Empleado } from "@interfaces/empleado";

export default function EmpleadoList() {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmpleados();
                setEmpleados(data);
            } catch (err) {
                console.error("Error al cargar empleados:", err);
                setError("No se pudo conectar con el servidor. Intente más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteEmpleado(id);
            setEmpleados(empleados.filter((e) => e.id !== id));
        } catch (err) {
            console.error("Error al eliminar empleado:", err);
            setError("No se pudo eliminar el empleado.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            {loading && <Loader text="Cargando empleados..." />}
            {error && <ErrorMessage message={error} />}

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empleados</h2>
            <Link
                to="/empleados/nuevo"
                className="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4">
                <span className="mr-2"><Edit size={16} /></span>
                Nuevo Empleado
            </Link>

            {empleados.length === 0 ? (
                <p className="text-gray-600">No hay empleados registrados.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">ID</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Nombre</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Documento</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Área</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Oficina</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Tipo Empleado</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Tipo Profesor</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((e) => (
                                <tr key={e.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{e.id}</td>
                                    <td className="px-6 py-4">{e.nombre}</td>
                                    <td className="px-6 py-4">{e.documento}</td>
                                    <td className="px-6 py-4">{e.area?.nombre || 'N/A'}</td>
                                    <td className="px-6 py-4">{e.oficina?.codigo || 'N/A'}</td>
                                    <td className="px-6 py-4">{e.tipoEmpleado}</td>
                                    <td className="px-6 py-4">{e.tipoProfesor ? e.tipoProfesor : "N/A"}</td>
                                    <td className="px-2 py-4">
                                        <Link
                                            to={`/empleados/editar/${e.id}`}
                                            className="inline-flex items-center bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">
                                            <Edit size={14} />
                                            <span className="ml-1">Editar</span>
                                        </Link>
                                        <button
                                            className="inline-flex items-center bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 cursor-pointer"
                                            onClick={() => handleDelete(e.id)}>
                                            <Trash2 size={14} />
                                            <span className="ml-1">Eliminar</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
