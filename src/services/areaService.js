import api from "./api";

export const getAreas = async () => {
    const res = await api.get("/area");
    return res.data;
};

export const getArea = async (id) => {
    const res = await api.get(`/area/${id}`);
    return res.data;
};

export const createArea = async (data) => {
    const res = await api.post("/area", data);
    return res.data;
};

export const updateArea = async (id, data) => {
    const res = await api.patch(`/area/${id}`, data);
    return res.data;
};

export const deleteArea = async (id) => {
    await api.delete(`/area/${id}`);
};
