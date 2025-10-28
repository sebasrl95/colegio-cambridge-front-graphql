import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSalones, deleteSalon } from "@services/salonService";
import Loader from "@components/Loader/Loader";
import ErrorMessage from "@components/Error/ErrorMessage";
import type { Salon } from "@interfaces/salon";

export default function SalonList() {
    const [salones, setSalones] = useState<Salon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSalones();
                setSalones(data);
            } catch (err) {
                console.error("Error al cargar salones:", err);
                setError("No se pudo conectar con el servidor. Intente más tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteSalon(id);
            setSalones(salones.filter((s) => s.id !== id));
        } catch (err) {
            console.error("Error al eliminar salón:", err);
            setError("No se pudo eliminar el salón. Revise la conexión con el servidor.");
        }
    };

    if (loading) return <Loader text="Cargando salones..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Salones</h2>
            <Link to="/salones/nuevo" className="btn btn-primary mb-3">
                Nuevo salón
            </Link>
            {salones.length === 0 ? (
                <p>No hay salones registrados.</p>
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
                        {salones.map((s) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.codigo}</td>
                                <td>{s.area?.nombre || 'N/A' }</td>
                                <td>
                                    <Link
                                        to={`/salones/editar/${s.id}`}
                                        className="btn btn-warning btn-sm me-2">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(s.id)}>
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
