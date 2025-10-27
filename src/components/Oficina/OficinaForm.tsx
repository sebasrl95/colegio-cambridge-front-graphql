import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOficina, createOficina, updateOficina } from "../../services/oficinaService";
import { getAreas } from "../../services/areaService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";

export default function OficinaForm() {
    const [codigo, setCodigo] = useState("");
    const [areaId, setAreaId] = useState("");
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const areasData = await getAreas();
                setAreas(areasData);
                if (id) {
                    const oficina = await getOficina(id);
                    setCodigo(oficina.codigo);
                    setAreaId(oficina.area?._id?.toString() || "");
                }
            } catch (err) {
                console.error("Error al cargar formulario:", err);
                setErrors(["No se pudo cargar la información. Intente más tarde."]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateOficina(id, { codigo, area: areaId });
            } else {
                await createOficina({ codigo, area: areaId });
            }
            navigate("/oficinas");
        } catch (err) {
            console.error("Error al crear oficina", err);
            setErrors(err.response.data.message);
        }
    };

    const handleCancel = () => {
        navigate("/oficinas");
    };

    if (loading) return <Loader text="Cargando formulario..." />;

    return (
        <div className="container mt-4">
            <h2>{id ? "Editar" : "Nuevo"} Salón</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Código</label>
                    <input
                        type="text"
                        className="form-control"
                        value={codigo}
                        onChange={e => setCodigo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="areaSelect">Área</label>
                    {areas.length === 0 ? (
                        <ErrorMessage message={'No se encuentran áreas registradas.'} />
                    ) :
                        <select
                            id="areaSelect"
                            className="form-select"
                            value={areaId}
                            onChange={(e) => setAreaId(e.target.value)}
                            required>
                            <option value="">Seleccione un área</option>
                            {areas.map((area) => (
                                <option key={area._id} value={area._id}>
                                    {area.nombre}
                                </option>
                            ))}
                        </select>
                    }
                </div>
                <button type="submit" className="btn btn-success me-2">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
            </form>
            {errors.length > 0 && errors.map((err) => (
                <ErrorMessage message={err} />
            ))}
        </div>
    );
}
