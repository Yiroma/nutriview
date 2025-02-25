import pool from "../config/database";

export interface Food {
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
    const [rows] = await pool.query("SELECT * FROM food");
    return rows as Food[];
  }

  static async getById(id: number): Promise<Food | null> {
    const [rows]: any = await pool.query("SELECT * FROM food WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async search(term: string): Promise<Food[]> {
    const [rows] = await pool.query("SELECT * FROM food WHERE name LIKE ?", [`%${term}%`]);
    return rows as Food[];
  }

  static async create(food: Omit<Food, "id">): Promise<Food> {
    const [result]: any = await pool.query("INSERT INTO food SET ?", [food]);
    return { ...food, id: result.insertId };
  }

  static async update(id: number, food: Partial<Food>): Promise<boolean> {
    const [result]: any = await pool.query("UPDATE food SET ? WHERE id = ?", [food, id]);
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result]: any = await pool.query("DELETE FROM food WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}
