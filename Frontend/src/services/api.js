// src/services/api.js

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust to your backend port

/**
 * Sends food nutritional data to the ML backend for classification.
 * @param {Object} foodData - The nutritional values of the food.
 * @returns {Promise<Object>} - The prediction result from the ML model.
 */
export const predictFoodNutrition = async (foodData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Ensure numerical values are parsed correctly before sending
      body: JSON.stringify({
        calories: parseFloat(foodData.calories),
        protein: parseFloat(foodData.protein),
        fat: parseFloat(foodData.fat),
        carbohydrates: parseFloat(foodData.carbohydrates),
        fiber: parseFloat(foodData.fiber),
        sugar: parseFloat(foodData.sugar)
      }),
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error - predictFoodNutrition:", error);
    throw error;
  }
};