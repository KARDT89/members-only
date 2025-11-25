import express from 'express';
import { homeRouter } from './routes/home.routes.js';

const app = new express()
const PORT = 3000

app.use("/", homeRouter)

app.listen(PORT, (err)=>{
    try {
        console.log(`running at http://localhost:${PORT}`);
    } catch (error) {
        console.error(err)
    }
})