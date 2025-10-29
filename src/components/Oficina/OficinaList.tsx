import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { getOficinas, deleteOficina } from "@services/oficinaService";
import Loader from "@components/Loader/Loader";
import ErrorMessage from "@components/Error/ErrorMessage";
import type { Oficina } from "@interfaces/oficina";

export default function OficinaList() {
    const [oficinas, setOficinas] = useState<Oficina[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetch data');
            try {
                const data = await getOficinas();
                setOficinas(data);
            } catch (err) {
                console.error("Error al cargar oficinas:", err);
                setError("No se pudo conectar con el servidor. Intente más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteOficina(id);
            setOficinas(oficinas.filter((s) => s.id !== id));
        } catch (err) {
            console.error("Error al eliminar oficina:", err);
            setError("No se pudo eliminar el oficina. Revise la conexión con el servidor.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            {loading && <Loader text="Cargando oficinas..." />}
            {error && <ErrorMessage message={error} />}

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oficinas</h2>
            <Link
                to="/oficinas/nuevo"
                className="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4">
                <span className="mr-2"><Edit size={16} /></span>
                Nueva Oficina
            </Link>
            {oficinas.length === 0 ? (
                <p className="text-gray-600">No hay oficinas registradas.</p>
            ) : (
                <table className="min-w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Código</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Área</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oficinas.map((o) => (
                            <tr key={o.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{o.id}</td>
                                <td className="px-6 py-4">{o.codigo}</td>
                                <td className="px-6 py-4">{o.area?.nombre || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/oficinas/editar/${o.id}`}
                                        className="inline-flex items-center bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">
                                        <Edit size={14} />
                                        <span className="ml-1">Editar</span>
                                    </Link>
                                    <button
                                        className="inline-flex items-center bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 cursor-pointer"
                                        onClick={() => handleDelete(o.id)}>
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
