import api from "./api";

export const getEmpleados = async () => {
    const res = await api.get("/empleado");
    return res.data;
};

export const getEmpleado = async (id) => {
    const res = await api.get(`/empleado/${id}`);
    return res.data;
};

export const createEmpleado = async (data) => {
    const res = await api.post("/empleado", data);
    return res.data;
};

export const updateEmpleado = async (id, data) => {
    const res = await api.patch(`/empleado/${id}`, data);
    return res.data;
};

export const deleteEmpleado = async (id) => {
    await api.delete(`/empleado/${id}`);
};
