import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAreas, deleteArea } from "../../services/areaService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";

export default function AreaList() {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const handleDelete = async (id) => {
        try {
            await deleteArea(id);
            setAreas(areas.filter((s) => s._id !== id));
        } catch (err) {
            console.error("Error al eliminar área:", err);
            setError("No se pudo eliminar el área. Revise la conexión con el servidor.");
        }
    };

    if (loading) return <Loader text="Cargando areas..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Áreas</h2>
            <Link to="/areas/nuevo" className="btn btn-primary mb-3">Nueva Área</Link>
            {areas.length === 0 ? (
                <p>No hay áreas registradas.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map(s => (
                            <tr key={s._id}>
                                <td>{s._id}</td>
                                <td>{s.nombre}</td>
                                <td>
                                    <Link to={`/areas/editar/${s._id}`} className="btn btn-warning btn-sm">Editar</Link>{" "}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
