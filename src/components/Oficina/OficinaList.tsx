import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOficinas, deleteOficina } from "../../services/oficinaService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";

export default function OficinaList() {
    const [oficinas, setOficinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
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

    const handleDelete = async (id) => {
        try {
            await deleteOficina(id);
            setOficinas(oficinas.filter((s) => s._id !== id));
        } catch (err) {
            console.error("Error al eliminar oficina:", err);
            setError("No se pudo eliminar el oficina. Revise la conexión con el servidor.");
        }
    };

    if (loading) return <Loader text="Cargando oficinas..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Oficinas</h2>
            <Link to="/oficinas/nuevo" className="btn btn-primary mb-3">
                Nueva oficina
            </Link>
            {oficinas.length === 0 ? (
                <p>No hay oficinas registradas.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Área</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oficinas.map((s) => (
                            <tr key={s._id}>
                                <td>{s._id}</td>
                                <td>{s.codigo}</td>
                                <td>{s.area.nombre}</td>
                                <td>
                                    <Link
                                        to={`/oficinas/editar/${s._id}`}
                                        className="btn btn-warning btn-sm me-2">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(s._id)}>
                                        Eliminar
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
