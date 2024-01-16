import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import Connectdb from './database/db.js';
import authRoutes from './route/authRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';

//Routes
import apiRoutes from './route/apiRoute.js'

//configure env
dotenv.config()

//datbase config
Connectdb();

//rest object
const app = express();

//middleware
app.use(cors()) //agar do server ko add karenga to problem nhi hogi cors saa
app.use(express.json())//req and resp ma json data bhaj sakta hai
app.use(morgan())
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api/v1',apiRoutes);


//rest api
app.get('/', (req, resp) => {
    resp.send({
        msg: 'welcome to boaim site'
    })
});


//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`.bgCyan.white)
})