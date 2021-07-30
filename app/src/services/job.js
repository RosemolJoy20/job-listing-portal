import axios from 'axios';

// this is our API manager, all calls to manager will stay here
export default class {

    // method to call our API to create new job object
    static add = async obj => {
        let result = {
            data: null,
            error: null
        };
        // using axios lib to call to our API
        await axios.post(`${process.env.REACT_APP_API_URL}/jobs/`, obj)
            .then((resp) => {
                // if success
                // get data and set it to a local variable
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch((err) => {
                result.error = err.response.data;
            });

        // return our variable
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