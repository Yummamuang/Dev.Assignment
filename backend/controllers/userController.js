const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ updatedAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ hn: req.body.hn });
        if (existingUser) {
            return res.status(400).json({ message: 'HN already exists' });
        }
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchUser = async (req, res) => {
    try {
        const { query } = req.query;
        const queryParts = query.split(' '); // Split the query into array

        const search = [
            { hn: { $regex: query, $options: 'i' } }, // Search by hn
            { firstname: { $regex: query, $options: 'i' } }, // Search by firstname
            { lastname: { $regex: query, $options: 'i' } } // Search by lastname    
        ];

        // If have second part (lastname) then update the search
        if (queryParts.length > 1) {
            search.push({
                $and: [
                    { firstname: { $regex: queryParts[0], $options: 'i' } },
                    { lastname: { $regex: queryParts[1], $options: 'i' } }
                ]
            });
        }

        const user = await User.find({ $or: search });
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllUsers, createUser, updateUser, searchUser, getUserById, deleteUser };