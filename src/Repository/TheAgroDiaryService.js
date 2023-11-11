import axios from '../custom-axios/axios';

const TheAgroDiaryService = {
    // fetchManufacturers: () => {
    //     return axios.get("/manufacturers");
    // },
    // fetchCategories: () => {
    //     return axios.get("/categories");
    // },
    fetchSeeds: () => {
        return axios.get("/seeds");
    },
    // deleteProduct: (id) => {
    //     return axios.delete(`/products/delete/${id}`);
    // },
    addSeed: (seedName) => {
        return axios.post("/seed/add", {
            "seedName": seedName,
        });
    },
    editSeed: (id, seedName) => {
        return axios.put(`/seed/edit/${id}`, {
            "seedName": seedName,
        });
    },
    getSeed: (id) => {
        return axios.get(`/seed/${id}`);
    },
    login: (username, password) => {
        return axios.post("/login", {
            "username": username,
            "password": password
        });
    },
}

export default TheAgroDiaryService;
