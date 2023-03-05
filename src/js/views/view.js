import icons from 'url:../../img/icons.svg';

export default class View {
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const mark = this._generateMarkup();

    if (!render) return mark;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', mark);
  }
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMark = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMark);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
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
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const mark = `
          <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', mark);
  };

  renderError(message = this._errorMessage) {
    const mark = `
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
    this._parentElement.insertAdjacentHTML('afterbegin', mark);
  }

  renderSuccesMessage(message = this._message) {
    const mark = `
              <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', mark);
  }
}
