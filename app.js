import express from 'express';

const app = new express()
const PORT = 3000


app.listen(PORT, (err)=>{
    try {
        console.log(`running at http://localhost:${PORT}`);
    } catch (error) {
        console.error(err)
    }
})