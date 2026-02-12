import api from "./axios";

export const searchAll = (query, type = "all") => {
    return api.get(`/search?q=${query}&type=${type}`);
};
