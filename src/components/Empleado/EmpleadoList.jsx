import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmpleados, deleteEmpleado } from "../../services/empleadoService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";

export default function EmpleadoList() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const handleDelete = async (id) => {
        try {
            await deleteEmpleado(id);
            setEmpleados(empleados.filter((e) => e._id !== id));
        } catch (err) {
            console.error("Error al eliminar empleado:", err);
            setError("No se pudo eliminar el empleado.");
        }
    };

    if (loading) return <Loader text="Cargando empleados..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mt-4">
            <h2>Empleados</h2>
            <Link to="/empleados/nuevo" className="btn btn-primary mb-3">
                Nuevo empleado
            </Link>

            {empleados.length === 0 ? (
                <p>No hay empleados registrados.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Área</th>
                            <th>Oficina</th>
                            <th>Tipo Empleado</th>
                            <th>Tipo Profesor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((e) => (
                            <tr key={e._id}>
                                <td>{e._id}</td>
                                <td>{e.nombre}</td>
                                <td>{e.documento}</td>
                                <td>{e.area.nombre}</td>
                                <td>{e.oficina.codigo}</td>
                                <td>{e.tipoEmpleado}</td>
                                <td>{e.tipoEmpleado === "profesor" ? e.tipoProfesor : "-"}</td>
                                <td>
                                    <Link
                                        to={`/empleados/editar/${e._id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(e._id)}
                                    >
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
