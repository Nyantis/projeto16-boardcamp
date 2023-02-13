import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRoutes from "./routes/games.routes.js"
import customersRoutes from "./routes/customers.routes.js"
import rentalsRoutes from "./routes/rentals.routes.js"

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

//uses
app.use(gamesRoutes);
app.use(customersRoutes);
app.use(rentalsRoutes);

app.listen(port, () => console.log(`Server running in port: ${port}`));