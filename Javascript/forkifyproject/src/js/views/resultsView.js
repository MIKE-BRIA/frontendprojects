import View from "./View.js";

import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _ParentElement = document.querySelector(".results");
  _errorMessage = "The recipe your looked up is not found try again later";
  _SuccessMessage = "";

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(results) {
    return `
    <li class="preview">
        <a class="preview__link " href="#${results.id}">
        <figure class="preview__fig">
            <img src="${results.image}" alt="Test" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${results.title}</h4>
            <p class="preview__publisher">${results.publisher}</p>
        </div>
        </a>
  </li>
`;
  }
}

export default new ResultsView();
