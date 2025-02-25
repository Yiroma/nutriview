interface Food {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function searchFoods(term: string): Promise<Food[]> {
  const response = await fetch(`${API_URL}/foods/search?q=${encodeURIComponent(term)}`);
  if (!response.ok) {
    throw new Error("Erreur lors de la recherche des aliments");
  }
  return response.json();
}

export async function getAllFoods(): Promise<Food[]> {
  const response = await fetch(`${API_URL}/foods`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des aliments");
  }
  return response.json();
}
