import axios from 'axios';

export default class {

    static add = async (name, email, phone, password) => {
        let result = {
            data: null,
            error: null
        };

        const d = {name, email, phone, password};

        await axios.post(`${process.env.REACT_APP_API_URL}/users/`, d)
            .then((resp) => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch((err) => {
                result.error = err.response.data;
            });

        return result;
    }

    static get = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch((err) => {
                result.error = err.response.data;
            });

        return result;
    }

    static getAll = async () => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${process.env.REACT_APP_API_URL}/users/`)
            .then((resp) => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch((err) => {
                result.error = err.response.data;
            });

        return result;
    }

    static delete = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then((resp) => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch((err) => {
                result.error = err.response.data;
            });

        return result;
    }

    static update = async (id, data) => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/users/${id}`, data)
            .then((resp) => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch((err) => {
                result.error = err.response.data;
            });

        return result;
    }
}