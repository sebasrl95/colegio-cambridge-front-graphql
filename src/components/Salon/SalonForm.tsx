import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSalon, createSalon, updateSalon } from "../../services/salonService";
import { getAreas } from "../../services/areaService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";

export default function SalonForm() {
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
                    const salon = await getSalon(id);
                    setCodigo(salon.codigo);
                    setAreaId(salon.area?._id?.toString() || "");
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
                await updateSalon(id, { codigo, area: areaId });
            } else {
                await createSalon({ codigo, area: areaId });
            }
            navigate("/salones");
        } catch (err) {
            console.error("Error al crear salon", err);
            setErrors(err.response.data.message);
        }
    };

    const handleCancel = () => {
        navigate("/salones");
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
