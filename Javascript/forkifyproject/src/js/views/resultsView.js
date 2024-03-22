import View from "./View.js";
import previewView from "./previewView.js";

import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _ParentElement = document.querySelector(".results");
  _errorMessage = "The recipe your looked up is not found try again later";
  _SuccessMessage = "";

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join("");
  }
}

export default new ResultsView();
