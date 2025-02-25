import { Router } from "express";
import { FoodController } from "../controllers/food.controller";

const router = Router();

router.get("/foods", FoodController.getAll);
router.get("/foods/search", FoodController.search);
router.get("/foods/:id", FoodController.getById);
router.post("/foods", FoodController.create);
router.put("/foods/:id", FoodController.update);
router.delete("/foods/:id", FoodController.delete);

export default router;
