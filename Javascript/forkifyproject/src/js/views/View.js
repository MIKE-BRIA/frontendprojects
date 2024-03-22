import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
      return;
    }
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._ParentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   this.renderError();
    //   return;
    // }
    this._data = data;
    const newMarkup = this._generateMarkup();

    //converting newMarkup into a dom object
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElement = Array.from(
      this._ParentElement.querySelectorAll("*")
    );

    // console.log(currentElement);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = currentElement[i];

      //update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("🔥", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._ParentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>    
    </div>
  `;
    this._ParentElement.innerHTML = "";
    this._ParentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //*Error handling
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;

    this._clear();
    this._ParentElement.insertAdjacentHTML("beforebegin", markup);
  }

  //*Success Message
  renderMessage(message = this._SuccessMessage) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;
  }
}
