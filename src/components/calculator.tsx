"use client";

import { useState, useEffect } from "react";
import { searchFoods } from "@/app/api/food";

interface Food {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export default function Calculator() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [weight, setWeight] = useState<number>(100);
  const [suggestions, setSuggestions] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const foods = await searchFoods(searchTerm);
        setSuggestions(foods);
      } catch (err) {
        setError("Erreur lors de la recherche des aliments");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const calculateNutrition = (nutritionPer100g: number, weight: number) => {
    return ((nutritionPer100g * weight) / 100).toFixed(1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Calculateur de Nutrition</h1>

      {/* SEARCH INPUT */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un aliment..."
          className="w-full p-2 border rounded"
        />
        {isLoading && <div className="mt-2 text-gray-500">Chargement...</div>}
        {error && <div className="mt-2 text-red-500">{error}</div>}
      </div>

      {/* SUGGESTIONS LIST */}
      {searchTerm && suggestions.length > 0 && (
        <div className="mt-2 border rounded shadow-lg">
          {suggestions.map((food) => (
            <div
              key={food.id}
              onClick={() => {
                setSelectedFood(food);
                setSearchTerm("");
                setSuggestions([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {food.name}
            </div>
          ))}
        </div>
      )}

      {/* SELECTED FOOD */}
      <div className="my-6">
        <p className="font-semibold">
          {selectedFood ? `Aliment sélectionné: ${selectedFood.name}` : "Aucun aliment sélectionné"}
        </p>
      </div>

      {/* WEIGHT INPUT */}
      {selectedFood && (
        <div className="mb-6">
          <label className="block mb-2">Grammage souhaité:</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="p-2 border rounded"
            min="1"
          />
        </div>
      )}

      {/* NUTRITION TABLE */}
      {selectedFood && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nutriments</th>
              <th className="border p-2">Pour 100g</th>
              <th className="border p-2">Pour {weight}g</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Calories (kcal)</td>
              <td className="border p-2">{selectedFood.calories}</td>
              <td className="border p-2">{calculateNutrition(selectedFood.calories, weight)}</td>
            </tr>
            <tr>
              <td className="border p-2">Protéines (g)</td>
              <td className="border p-2">{selectedFood.proteins}</td>
              <td className="border p-2">{calculateNutrition(selectedFood.proteins, weight)}</td>
            </tr>
            <tr>
              <td className="border p-2">Glucides (g)</td>
              <td className="border p-2">{selectedFood.carbs}</td>
              <td className="border p-2">{calculateNutrition(selectedFood.carbs, weight)}</td>
            </tr>
            <tr>
              <td className="border p-2">Lipides (g)</td>
              <td className="border p-2">{selectedFood.fats}</td>
              <td className="border p-2">{calculateNutrition(selectedFood.fats, weight)}</td>
            </tr>
            <tr>
              <td className="border p-2">Fibres (g)</td>
              <td className="border p-2">{selectedFood.fiber}</td>
              <td className="border p-2">{calculateNutrition(selectedFood.fiber, weight)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
