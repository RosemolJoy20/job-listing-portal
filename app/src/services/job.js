import axios from 'axios';

export default class {

    static add = async obj => {
        let result = {
            data: null,
            error: null
        };
        await axios.post(`${process.env.REACT_APP_API_URL}/jobs/`, obj)
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

        await axios.get(`${process.env.REACT_APP_API_URL}/jobs/`)
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

        await axios.delete(`${process.env.REACT_APP_API_URL}/jobs/${id}`)
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

        await axios.post(`${process.env.REACT_APP_API_URL}/jobs/${id}`, data)
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