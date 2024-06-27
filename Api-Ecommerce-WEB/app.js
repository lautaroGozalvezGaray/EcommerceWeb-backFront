import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import { Server as HttpServer } from 'http';

import sessionRoutes from "./src/routes/session/session-routes.js";
import productRoutes from "./src/routes/products/products-routes.js";
import cartRoutes from "./src/routes/cart/cart-routes.js";
import infoAccountRoutes from "./src/routes/infoAccount/infoAccount-routes.js";
import routerOrder from './src/routes/order/order-routes.js';

dotenv.config();

const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express();
const httpServer = new HttpServer(app);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: advanceOptions
  }),
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 3600000
  },
  secret: process.env.SECRET_KEY_SESSION,
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/session", sessionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carrito", cartRoutes);
app.use("/api/info", infoAccountRoutes);
app.use("/api/order", routerOrder);

export default httpServer;
