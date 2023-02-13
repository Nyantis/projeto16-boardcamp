import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/games.routes.js"

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

//uses
app.use(customerRoutes);

app.listen(port, () => console.log(`Server running in port: ${port}`));