import View from './view';
import PreviewView from './previewView';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  ingre = [];

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    this.ingre = [];
  }
  ingredientList() {
    for (let i = 1; i < 7; i++) {
      if (document.querySelector(`.description${i}`).value != '') {
        const [quantity, unit, description] = [
          `${document.querySelector(`.quantity${i}`).value.trim()}`,
          `${document.querySelector(`.unit${i}`).value.trim()}`,
          `${document.querySelector(`.description${i}`).value.trim()}`,
        ];
        this.ingre.push({ quantity, unit, description });
      }
    }
    return this.ingre;
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
