import View from './view';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    return `
    ${this._data
      .map(search => {
        const id = window.location.hash.slice(1);
        return `
      <li class="preview">
      <a class="preview__link ${
        search.id === id ? 'preview__link--active' : ''
      }" href="#${search.id}">
        <figure class="preview__fig">
          <img src="${search.image}" alt="${search.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${search.title}</h4>
          <p class="preview__publisher">${search.publisher}n</p>
          <div class="recipe__user-generated ${search.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        </div>
      </a>
    </li>`;
      })
      .join()}
`;
  }
}
export default new PreviewView();
