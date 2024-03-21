import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  try {
    //!main menu bar
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

//! function dealing with the search results
const controlSearchResults = async function () {
  try {
    //! Side menu bar
    resultsView.renderSpinner();
    console.log(resultsView);

    //*get search query
    const query = searchView.getQuery();
    if (!query) return;

    //*Load search results
    await model.loadSearchResults(query);

    //*render search results
    console.log(model.state.search.results);

    resultsView.render(model.state.search.results);
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
