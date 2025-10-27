import api from "./api";

export const getSalones = async () => {
    const res = await api.get("/salon");
    return res.data;
};

export const getSalon = async (id) => {
    const res = await api.get(`/salon/${id}`);
    return res.data;
};

export const createSalon = async (data) => {
    const res = await api.post("/salon", data);
    return res.data;
};

export const updateSalon = async (id, data) => {
    const res = await api.patch(`/salon/${id}`, data);
    return res.data;
};

export const deleteSalon = async (id) => {
    await api.delete(`/salon/${id}`);
};
