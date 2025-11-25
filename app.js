import express from 'express'

const app = new express()
const PORT = 3000

app.get("/", (req, res) => {
    res.send("helloworld")
})

app.listen(PORT, (error)=>{
    try {
        console.log(`running at http://localhost:${PORT}`);
    } catch (error) {
        console.error(error)
    }
})