import express from 'express';
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import sellerRoutes from './routes/seller.routes.js'
import productRoutes from './routes/product.routes.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.json({
        "success":true,
        "message":"Welcome to Snitch2.0 API"
    });  
})

app.use("/api/auth", authRoutes)
app.use("/api/seller", sellerRoutes)
app.use("/api/products", productRoutes) 
app.use(errorHandler);



export default app;