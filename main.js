import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test');

dotenv.config();

const {PORT, MONGO_CONNECTION_STRING} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(MONGO_CONNECTION_STRING);


// I GET

app.get('/memberships', async (req, res) => {
    const connection = await mongoClient.connect();
    const memberships = await connection
        .db('project')
        .collection('services')
        .find({})
        .toArray();
    connection.close();
    res.send(memberships);
});

// II POST

app.post('/memberships', async (req,res) => {
    const { id, name, price, description} = req.body;
    const connection = await mongoClient.connect();
    const data = await connection
        .db('project')
        .collection('services')
        .insertOne({
           id, name, price, description
        })
    await connection.close();
    res.send(data);
});

// III DELETE

app.delete('/memberships/:id', async (req,res) => {
    const membershipId = Number(req.params.id);
    const connection = await mongoClient.connect();
    const data = await connection
        .db('project')
        .collection('services')
        .deleteOne({
           id : membershipId
        });
    res.send(data);
});


// // IV GET

app.get('/users/:order', async (req, res) => {
    const connection = await mongoClient.connect();
    let order = 1;
    if(res.query.order) {
        order = req.query.order === "ASC" ? 1 : -1;
    }

    const findService = await connection 
    .db('project')
    .collection('users')
    .aggregate([
        {
            $lookup: {
                from: 'services',
                localField: 'service_id',
                foreignField: 'id',
                as: 'service',
            },
        },
    ])
    .sort({name: order})
    .toArray();
    const cleanUser = findService.map((user)=>{
        return {
            name: user.name,
            surname: user.surname,
            email: user.email,
            service: user.service?.name,
            ip: user.ip,
        };
    });
    res.send(cleanUser);
});


// V POST

app.get('/users', async (req, res) => {
    const connection = await mongoClient.connect();
    const users = await connection
    .db('project')
    .collection('users')
    .find({})
    .toArray();
    connection.close();
    res.send(users);
});

app.post('/users', async (req,res) => {
    const { name, surname, email, membership, service_id } = req.body;
    const connection = await mongoClient.connect();
    const data = await connection
        .db('project')
        .collection('users')
        .insertOne({
            name, surname, email, membership, service_id
        });
    await connection.close();
    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: `, PORT);
})