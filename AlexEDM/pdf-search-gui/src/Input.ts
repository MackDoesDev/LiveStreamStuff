import {QTextEdit} from '@nodegui/nodegui';
import App from "./App";

class Input {
  private readonly _app: App;
  private readonly _view: QTextEdit;

  constructor(app: App) {
    this._app = app;
    this._view = new QTextEdit();
    this._view.setObjectName('file_list_input');
    this._view.setAcceptDrops(true);
    this._view.addEventListener('textChanged', () => {
      this._app.onInputChanged(this, this._view.toPlainText());
    })
  }

  get view() {
    return this._view;
  }
}

export default Input;