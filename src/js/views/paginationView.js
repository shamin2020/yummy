import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkupButton(page, act, arrow) {
    const mark = `
    <button data-goto="${page}" class="btn--inline pagination__btn--${act}">
            <span>Page ${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            </button>
    `;
    return mark;
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (numPages <= 1) return;
    if (numPages > 1 && this._data.page == 1)
      return `<p class="p--inline">${
        this._data.page
      }/${numPages}</p>${this._generateMarkupButton(
        this._data.page + 1,
        'next',
        'right'
      )}`;
    if (numPages > 1 && this._data.page == numPages)
      return `<p class="p--inline">${
        this._data.page
      }/${numPages}</p>${this._generateMarkupButton(
        this._data.page - 1,
        'prev',
        'left'
      )} `;
    if (numPages > 1 && this._data.page < numPages) {
      return `
      <p class="p--inline">${this._data.page}/${numPages}</p>
        ${this._generateMarkupButton(this._data.page + 1, 'next', 'right')}
        ${this._generateMarkupButton(
          this._data.page - 1,
          'prev',
          'left'
        )}         
    `;
    }
  }
}
export default new PaginationView();
