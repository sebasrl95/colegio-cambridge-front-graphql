import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOficina, createOficina, updateOficina } from "@services/oficinaService";
import { getAreas } from "@services/areaService";
import { Save, X } from 'lucide-react';
import Loader from "@components/Loader/Loader";
import ErrorMessage from "@components/Error/ErrorMessage";
import type { Area } from "@interfaces/area";

export default function OficinaForm() {
    const [codigo, setCodigo] = useState<string>("");
    const [areaId, setAreaId] = useState<string>("");
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
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
                    setAreaId(oficina.area?.id?.toString() || "");
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                await updateOficina(id, { codigo, area: areaId });
            } else {
                await createOficina({ codigo, area: areaId });
            }
            navigate("/oficinas?refresh=true");
        } catch (err: PromiseLike<unknown> | unknown) {
            console.error("Error al procesar oficina", err);
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
        navigate("/oficinas");
    };

    if (loading) return <Loader text="Cargando formulario..." />;

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{id ? "Editar" : "Nueva"} Oficina</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                    <input
                        id="codigo"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={codigo}
                        onChange={e => setCodigo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="areaSelect">Área</label>
                    {areas.length === 0 ? (
                        <ErrorMessage message={'No se encuentran áreas registradas.'} />
                    ) :
                        <select
                            id="areaSelect"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={areaId}
                            onChange={(e) => setAreaId(e.target.value)}
                            required>
                            <option value="">Seleccione un área</option>
                            {areas.map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.nombre}
                                </option>
                            ))}
                        </select>
                    }
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
                <ErrorMessage message={err} />
            ))}
        </div>
    );
}
