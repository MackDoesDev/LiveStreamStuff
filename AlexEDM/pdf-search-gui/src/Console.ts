import {GlobalColor, BrushStyle, QBrush, QListWidget, QListWidgetItem} from "@nodegui/nodegui";

class Console {
  private readonly _view: QListWidget;
  private readonly _logBrush: QBrush;
  private readonly _warnBrush: QBrush;
  private readonly _errorBrush: QBrush;

  constructor() {
    this._view = new QListWidget();
    this._view.setObjectName('console_view');
    this._view.setAlternatingRowColors(true);

    this._logBrush = new QBrush(GlobalColor.white, BrushStyle.SolidPattern);
    this._warnBrush = new QBrush(GlobalColor.yellow, BrushStyle.SolidPattern);
    this._errorBrush = new QBrush(GlobalColor.red, BrushStyle.SolidPattern);
  }

  get view(): QListWidget {
    return this._view;
  }

  log(message: string) {
    this._log(message, this._logBrush);
  }

  warn(message: string) {
    this._log(message, this._warnBrush);
  }

  error(message: string) {
    this._log(message, this._errorBrush);
  }

  private _log(message: string, brush: QBrush) {
    const logItem = new QListWidgetItem(`${(new Date()).toString()}: ${message}`);
    logItem.setForeground(brush);

    this._view.addItem(logItem);
    this._view.scrollToBottom();
  }
}

export default Console;