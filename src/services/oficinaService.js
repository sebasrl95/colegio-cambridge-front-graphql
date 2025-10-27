import api from "./api";

export const getOficinas = async () => {
    const res = await api.get("/oficina");
    return res.data;
};

export const getOficina = async (id) => {
    const res = await api.get(`/oficina/${id}`);
    return res.data;
};

export const createOficina = async (data) => {
    const res = await api.post("/oficina", data);
    return res.data;
};

export const updateOficina = async (id, data) => {
    const res = await api.patch(`/oficina/${id}`, data);
    return res.data;
};

export const deleteOficina = async (id) => {
    await api.delete(`/oficina/${id}`);
};
