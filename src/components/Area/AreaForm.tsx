import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X } from 'lucide-react';
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
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{id ? "Editar" : "Nuevo"} Área</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="flex space-x-2">
                    <button type="submit" className="inline-flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 cursor-pointer">
                        <Save size={16} />
                        <span className="ml-2">Guardar</span>
                    </button>
                    <button type="button" className="inline-flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 cursor-pointer" onClick={handleCancel}>
                        <X size={16} />
                        <span className="ml-2">Cancelar</span>
                    </button>
                </div>
            </form>
            {errors.length > 0 && errors.map((err) => (
                <ErrorMessage message={err} key={err} />
            ))}
        </div>
    );
}
