import Console from "./Console";
import {NativeElement, QGridLayout, QIcon, QListWidgetItem, QMainWindow, QStatusBar, QWidget} from "@nodegui/nodegui";
import Input from "./Input";
import FileProgressList from "./FileProgressList";

type AppProbs = {
  title: string;
  icon: NativeElement;
  height: number;
  width: number;
}

class App {
  private readonly _mainWindow: QMainWindow;
  private readonly _statusBar: QStatusBar;
  private readonly _layout: QGridLayout;
  private readonly _console: Console;
  private readonly _input: Input;
  private readonly _fileProgress: FileProgressList;

  constructor({ title, icon, height, width }: AppProbs) {
    this._mainWindow = new QMainWindow();
    this._statusBar = new QStatusBar();
    this._layout = new QGridLayout();
    this._console = new Console();
    this._input = new Input(this);
    this._fileProgress = new FileProgressList();

    this._mainWindow.setWindowTitle(title);
    this._mainWindow.setWindowIcon(new QIcon(icon));
    this._mainWindow.resize(width, height);

    const centralWidget = new QWidget();
    centralWidget.setObjectName('root');
    centralWidget.setLayout(this._layout);

    this._layout.setHorizontalSpacing(0);
    this._layout.addWidget(this._input.view, 0, 0, 2);
    this._layout.addWidget(this._fileProgress.view, 0, 1);
    this._layout.addWidget(this._console.view, 1, 1);

    this._mainWindow.setCentralWidget(centralWidget);
    this._mainWindow.setStatusBar(this._statusBar);
  }

  addStyleSheet(styles: string) {
    this._mainWindow.setStyleSheet(styles);
  }

  onInputChanged(input: Input, text: string) {
    const items = text.split('\n');
    this._fileProgress.setItems(items);
  }

  run() {
    this._mainWindow.show();
  }

  get console() {
    return this._console;
  }
}

export default App;