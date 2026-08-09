import express from 'express';
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import sellerRoutes from './routes/seller.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import checkoutRoutes from './routes/checkout.routes.js'
import orderRoutes from './routes/order.routes.js'
import wishlistRoutes from './routes/wishlist.routes.js'
import aiRoutes from './routes/ai.routes.js'


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
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/ai", aiRoutes)
app.use(errorHandler);

export default app;