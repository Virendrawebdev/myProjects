import express from 'express';
import session from 'express-session';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import sellerRoutes from './routes/seller.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import orderRoutes from './routes/order.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import aiRoutes from './routes/ai.routes.js';
import reviewRoutes from './routes/review.routes.js';
import paymentsRoutes from './routes/payment.routes.js';
import dashboardRoutes from './routes/dashbord.routes.js';
import passport from './config/passport.js';
import { config } from './config/config.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const publicDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public'
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

 
app.use(express.static(publicDirectory));
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
app.use("/api/review", reviewRoutes)
app.use("/api/payments", paymentsRoutes)
app.use("/api/seller/dashboard", dashboardRoutes)

app.get("/{*path}", (req, res, next) => {
    const isApiRequest = req.path === "/api" || req.path.startsWith("/api/");

    if (isApiRequest || path.extname(req.path) || !req.accepts("html")) {
        return next();
    }

    res.sendFile(path.join(publicDirectory, "index.html"), (error) => {
        if (error) next(error);
    });
});

app.use(errorHandler);

export default app;