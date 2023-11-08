import axios from 'axios';

const API_URL = "/api/registration";

const register = (firstName, lastName, username, password) => {
    return axios
        .post(API_URL, {
            firstName,
            lastName,
            username,
            password
        })
        .then((response) => {
            if (response.data.jwt) {
                localStorage.setItem("person", JSON.stringify(response.data))
            }

            return response.data;
        })
}