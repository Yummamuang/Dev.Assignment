// import axios
import axios from "axios";
// import apiUrl
const api = import.meta.env.VITE_API_URL;

// * define api *
// get all users
const getAllusers = async () => {
    try {
        const res = await axios.get(`${api}/users`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
} 

// create user
const createUser = async (user) => {
    try {
        const res = await axios.post(`${api}/users`, user);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export default { getAllusers, createUser };