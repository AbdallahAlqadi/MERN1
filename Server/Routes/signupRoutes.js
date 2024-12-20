const express = require('express');
const cors = require('cors');
const routes = express.Router();
require('dotenv').config();

const {
    createSignup,
    getSignup,
    getSignupById,
    Deletsignupbyid,
    Updatesignup,
    partialUpdateSignup
} = require('../controllers/signupcontroller');

// POST - Create a new signup
routes.post('/signup', createSignup);

// GET - Retrieve all signups
routes.get('/signup/users', getSignup);

// GET - Retrieve a specific signup by ID
routes.get('/signup/:id', getSignupById);

// DELETE - Delete a signup by ID
routes.delete('/signup/:id', Deletsignupbyid);

// PUT - Update a signup completely by ID
routes.put('/signup/update/:id', Updatesignup);

// PATCH - Partially update a signup by ID
routes.patch('/signup/update/:id', partialUpdateSignup);

// HEAD - Check if a specific signup exists
routes.head('/signup/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const signupExists = await Signup.exists({ _id: id });
        if (!signupExists) {
            return res.status(404).end();
        }
        res.status(200).end();
    } catch (error) {
        res.status(500).end();
    }
});

// OPTIONS - Provide allowed HTTP methods for the signup endpoint
routes.options('/signup', (req, res) => {
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(200).end();
});

module.exports = routes;
