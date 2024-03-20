import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// console.log(icons);

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
  } catch (err) {
    alert(err);
  }
};

// controlRecipe();

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
console.log("I am arround");
console.log("helloo");
