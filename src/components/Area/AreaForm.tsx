import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArea, createArea, updateArea } from "@services/areaService";
import ErrorMessage from "@components/Error/ErrorMessage";

export default function AreaForm() {
    const [nombre, setNombre] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getArea(id).then(data => setNombre(data.nombre));
        }
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (id) {
                await updateArea(id, { nombre });
            } else {
                await createArea({ nombre });
            }
            navigate("/areas");
        } catch (err: PromiseLike<unknown> | unknown) {
            console.error("Error al crear area", err);
            const axiosLike = err as { response?: { data?: { message?: string[] | string } } } | undefined;
            if (axiosLike?.response?.data?.message) {
                const msg = axiosLike.response.data.message;
                setErrors(Array.isArray(msg) ? msg : [msg]);
            } else if (err instanceof Error) {
                setErrors([err.message]);
            } else {
                setErrors(["Error al procesar la solicitud"]);
            }
        }
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
            {errors.length > 0 && errors.map((err) => (
                <ErrorMessage message={err} />
            ))}
        </div>
    );
}
