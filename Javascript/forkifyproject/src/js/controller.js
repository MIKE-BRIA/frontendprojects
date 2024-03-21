import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    //*loading recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;

    //* Rendering recipe

    recipeView.render(recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

// controlRecipe();
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
console.log("I am arround");
console.log("helloo");
