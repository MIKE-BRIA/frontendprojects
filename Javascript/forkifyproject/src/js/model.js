import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const data = await getJSON(`${API_URL}/${id}`);

    console.log(data);

    let recipe = data.data.recipe;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (error) {
    //Temp error handling
    console.error(`${error} 🔥🔥🔥🔥🔥`);
    throw error;
  }
};

//*Search recipe
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(` ${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(data);
    console.log(state.search.query);
    // console.log({ recipe });
  } catch {
    console.error(`${error} 🔥🔥🔥🔥🔥`);
    throw error;
  }
};

// loadSearchResults("pizza");
