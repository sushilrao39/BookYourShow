// import "dotenv/config";   // 👈 sabse upar
import dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoutes.js";
import connectDB  from './config/db.js'
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();

// Middleware 
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())



// API Routes
app.get("/", (req , res) => {
  return res.status(200).json({
    message:"Mongodb Connected Successfully",
    success:true
  })
});
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin', adminRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  connectDB();
});


