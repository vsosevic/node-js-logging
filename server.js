import express from 'express';
import bodyParser from 'body-parser';
import routes from "./src/routes/logRoutes.js";
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import * as socketIO from "socket.io";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 4000;

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const dbUrl = process.env.MONGODB_URL;
routes(app);

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log('mongodb connected');
});

export const io = new socketIO.Server(httpServer);
io.on('connection', (socket) => {
    console.log('a user connected');
});

httpServer.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);
