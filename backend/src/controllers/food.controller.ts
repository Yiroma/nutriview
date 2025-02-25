import { Request, Response } from "express";
import { FoodModel } from "../models/food.model";

export class FoodController {
  static async getAll(req: Request, res: Response) {
    try {
      const foods = await FoodModel.getAll();
      res.json(foods);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const food = await FoodModel.getById(Number(req.params.id));
      if (food) {
        res.json(food);
      } else {
        res.status(404).json({ error: "Aliment non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async search(req: Request, res: Response) {
    try {
      const term = req.query.q as string;
      const foods = await FoodModel.search(term);
      res.json(foods);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const food = await FoodModel.create(req.body);
      res.status(201).json(food);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const success = await FoodModel.update(Number(req.params.id), req.body);
      if (success) {
        res.json({ message: "Aliment mis à jour" });
      } else {
        res.status(404).json({ error: "Aliment non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const success = await FoodModel.delete(Number(req.params.id));
      if (success) {
        res.json({ message: "Aliment supprimé" });
      } else {
        res.status(404).json({ error: "Aliment non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}
