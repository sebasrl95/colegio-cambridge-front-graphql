import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import Loader from "@components/Loader/Loader";
import { Edit, Trash2 } from "lucide-react";
import ErrorMessage from "@components/Error/ErrorMessage";
import { getAreas, deleteArea } from "@services/areaService"
import type { Area } from "@interfaces/area";

export default function AreaList(): JSX.Element {
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAreas();
                setAreas(data);
            } catch (err) {
                console.error("Error al cargar áreas:", err);
                setError("No se pudo conectar con el servidor. Intente más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteArea(id);
            setAreas(areas.filter((s) => s.id !== id));
        } catch (err) {
            console.error("Error al eliminar área:", err);
            setError("No se pudo eliminar el área. Revise la conexión con el servidor.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            {loading && <Loader text="Cargando áreas..." />}
            {error && <ErrorMessage message={error} />}

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Áreas</h2>
            <Link
                to="/areas/nuevo"
                className="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4">
                <span className="mr-2"><Edit size={16} /></span>
                Nueva Área
            </Link>

            {areas.length === 0 ? (
                <p className="text-gray-600">No hay áreas registradas.</p>
            ) : (
                <table className="min-w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Nombre</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map((s) => (
                            <tr key={s.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{s.id}</td>
                                <td className="px-6 py-4">{s.nombre}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/areas/editar/${s.id}`}
                                        className="inline-flex items-center bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">
                                        <Edit size={14} />
                                        <span className="ml-1">Editar</span>
                                    </Link>
                                    <button
                                        className="inline-flex items-center bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                                        onClick={() => handleDelete(s.id)}>
                                        <Trash2 size={14} />
                                        <span className="ml-1">Eliminar</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
