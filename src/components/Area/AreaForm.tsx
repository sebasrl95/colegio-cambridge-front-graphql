import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArea, createArea, updateArea } from "../../services/areaService";

export default function AreaForm() {
    const [nombre, setNombre] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getArea(id).then(data => setNombre(data.nombre));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateArea(id, { nombre });
        } else {
            await createArea({ nombre });
        }
        navigate("/areas");
    };

    const handleCancel = () => {
        navigate("/areas");
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar" : "Nuevo"} Área</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
}
