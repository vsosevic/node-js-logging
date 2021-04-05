import mongoose from "mongoose";
import {LogSchema} from "../models/logModel.js";
import {io} from "../../server.js"

const Log = mongoose.model('log', LogSchema);

export const addNewLog = async (req, res) => {
    try {
        let newLog = new Log(req.body);
        let savedLog = await newLog.save();
        if (savedLog) {
            io.emit('log', savedLog);
            res.json(savedLog);
        }
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
};

export const getLogs = async (req, res) => {
    try {
        let log = await Log.find({});
        if (log) {
            res.json(log);
        }
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
};

export const getLogByID = async (req, res) => {
    try {
        let log = await Log.findById(req.params.logID);
        if (log) {
            res.json(log);
        }
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
};

export const deleteLog = (req, res) => {
    Log.remove({_id: req.params.logID}, (err, log) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `succesfully deleted log with id ${req.params.logID}`});
    });
};