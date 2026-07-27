import express from 'express';
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser'


const app = express();

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.json({
        "success":true,
        "message":"Welcome to Snitch2.0 API"
    });  
})

app.use("/api/auth", authRoutes)
app.use(errorHandler);



export default app;