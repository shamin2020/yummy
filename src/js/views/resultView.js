import View from './view';
import PreviewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No reciept find for your query! Please try another one!';
  _message = '';

  _generateMarkup() {
    return PreviewView.render(this._data, false);
  }
}
export default new ResultView();
