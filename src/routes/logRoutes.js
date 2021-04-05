import {
    addNewLog,
    getLogs,
    getLogByID,
    deleteLog
} from "../controllers/logController.js";
import fs from 'fs';

const routes = (app) => {
    app.route('/')
        .get((req, res, next) => {
            res.writeHead(200, {'content-type': 'text/html'})
            fs.createReadStream('index.html').pipe(res)
        });

    app.route('/logging')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, getLogs)

        // Post endpoint.
        .post(addNewLog);

    app.route('/log/:logID')
        // get a specific log
        .get(getLogByID)
        // delete a specific log
        .delete(deleteLog);
};

export default routes;