import View from "./View.js";
import previewView from "./previewView.js";

import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  _ParentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks have been made yet";
  _SuccessMessage = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
