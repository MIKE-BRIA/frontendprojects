import View from "./View.js";

import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _ParentElement = document.querySelector(".pagination");

  _generateMarkup() {
    markup = `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
        </button>
        <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
    `;

    // page 1 and there are other pages

    // page 1 and there are no other pages

    //last page

    //other page
  }
}

export default new PaginationView();
