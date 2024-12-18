// import axios from config
import instance from './config/axiosConfig.js';

// * define api *
// get all users
const getAllusers = async () => {
    try {
        const res = await instance.get('/users');
        return res.data;
    } catch (err) {
        console.log(err);
    }
} 

// create user
const createUser = async (user) => {
    try {
        const res = await instance.post('/users', user);
        return res.data;
    } catch (err) {
        return err;
    }
}

// update user
const updateUser = async (user) => {
    try {
        const res = await instance.put(`/users/${user._id}`, user);
        return res.data;
    } catch (err) {
        return err;
    }
}

// search user
const searchUser = async (user) => {
    try {
        const res = await instance.get(`/users/search?query=${user}`);
        if (res.status === 404) {
            console.clear();
            return [];
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

// get user by id
const getUserById = async (id) => {
    try {
        const res = await instance.get(`/users/${id}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

// delete user
const deleteUser = async (id) => {
    try {
        const res = await instance.delete(`/users/${id}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export default { getAllusers, createUser, updateUser, searchUser, getUserById, deleteUser };