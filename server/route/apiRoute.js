import express from "express";
const app = express();
//import Route
import authRoute from './authRoute.js';
import course from './courseRoute.js';
import classRoute from './classRoute.js'
// use imported route
app.use('/auth',authRoute);
app.use('/course',course);
app.use('/class',classRoute);

export default app;