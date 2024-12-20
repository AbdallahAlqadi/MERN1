const Signup = require('../models/signup');

// Create a new signup
exports.createSignup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newSignup = { username, email, password };
        console.log(newSignup);
        
        const dbSignup = await Signup.create(newSignup);
        
        res.status(201).json({ message: `User created successfully`, data: dbSignup });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all signups
exports.getSignup = async (req, res) => {
    try {
        const signup = await Signup.find();
        console.log(signup);
        res.status(200).json(signup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a signup by ID
exports.getSignupById = async (req, res) => {
    try {
        const id = req.params.id;
        const signup = await Signup.findById(id);
        if (!signup) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(signup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a signup by ID
exports.Deletsignupbyid = async (req, res) => {
    try {
        const id = req.params.id;
        const deletuser = await Signup.findOneAndDelete({ _id: id });
        if (!deletuser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', data: deletuser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a signup completely by ID
exports.Updatesignup = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        console.log(body);

        const updatesignup = await Signup.findByIdAndUpdate(id, body, { new: true });
        if (!updatesignup) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatesignup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Partially update a signup by ID
exports.partialUpdateSignup = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedSignup = await Signup.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedSignup) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedSignup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
