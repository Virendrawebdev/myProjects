import express from 'express';


const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.json({
        "success":true,
        "message":"Welcome to Snitch2.0 API"
    });  
})



export default app;