import pool from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface Food extends RowDataPacket {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export class FoodModel {
  static async getAll(): Promise<Food[]> {
    const [rows] = await pool.query<Food[]>("SELECT * FROM food");
    return rows;
  }

  static async getById(id: number): Promise<Food | null> {
    const [rows] = await pool.query<Food[]>("SELECT * FROM food WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async search(term: string): Promise<Food[]> {
    const [rows] = await pool.query<Food[]>("SELECT * FROM food WHERE name LIKE ?", [`%${term}%`]);
    return rows;
  }

  static async create(food: Omit<Food, "id">): Promise<Food> {
    const [result] = await pool.query<ResultSetHeader>("INSERT INTO food SET ?", [food]);
    return { ...food, id: result.insertId } as Food;
  }

  static async update(id: number, food: Partial<Food>): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>("UPDATE food SET ? WHERE id = ?", [
      food,
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM food WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}
