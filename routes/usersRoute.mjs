// usersRoute.mjs

import express from "express";
import User from "../modules/user.mjs";
import HttpCodes from "../modules/httpErrorCodes.mjs";
import bcrypt from "bcrypt"; 

const USER_API = express.Router();

const users = [];

USER_API.get('/:id', (req, res) => {
    const userId = req.params.id;

    const user = users.find(u => u.id === userId);

    if (user) {
        res.status(HttpCodes.SuccessfulResponse.Ok).json(user);
    } else {
        res.status(HttpCodes.ClientSideErrorResponse.NotFound).end();
    }
});

USER_API.post('/', (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name && email && password) {
            const user = new User();
            user.id = users.length + 1; 
            user.name = name;
            user.email = email;
            user.pswHash = bcrypt.hashSync(password, 10); 

            const exists = users.some(u => u.email === user.email);

            if (!exists) {
                users.push(user);
                console.log('User created successfully:', user);
                res.status(HttpCodes.SuccessfulResponse.Ok).json({ id: user.id });
            } else {
                console.log('User creation failed - Email already exists:', user);
                res.status(HttpCodes.ClientSideErrorResponse.BadRequest).json({ error: "User with this email already exists" });
            }
        } else {
            console.log('User creation failed - Missing data fields:', req.body);
            res.status(HttpCodes.ClientSideErrorResponse.BadRequest).json({ error: "Missing data fields" });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(HttpCodes.ServerErrorResponse.InternalServerError).json({ error: 'Internal Server Error' });
    }
});


USER_API.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const user = users.find(u => u.id === userId);

    if (user) {
        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            user.email = email;
        }

        if (password !== undefined) {
            user.pswHash = bcrypt.hashSync(password, 10); 
        }

        res.status(HttpCodes.SuccessfulResponse.Ok).end();
    } else {
        res.status(HttpCodes.ClientSideErrorResponse.NotFound).end();
    }
});

USER_API.delete('/:id', (req, res) => {
    const userId = req.params.id;

    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(HttpCodes.SuccessfulResponse.Ok).end();
    } else {
        res.status(HttpCodes.ClientSideErrorResponse.NotFound).end();
    }
});

USER_API.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(HttpCodes.ServerErrorResponse.InternalServerError).json({ error: 'Internal Server Error' });
});


export default USER_API;
