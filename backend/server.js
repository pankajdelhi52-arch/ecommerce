import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/userRoutes.js";

dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();

const app = express();  // ✅ pehle app banao

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);  // ✅ phir routes lagao

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});