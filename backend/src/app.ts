import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodRoutes from "./routes/food.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Documentation API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", foodRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
