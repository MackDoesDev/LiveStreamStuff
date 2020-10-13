// import {
//   QMainWindow,
//   QWidget,
//   QGridLayout,
//   QIcon,
//   QListWidget,
//   QListWidgetItem,
//   QTextEdit,
//   QPushButton,
//   FlexLayout
// } from '@nodegui/nodegui';
// import logo from '../assets/logox200.png';
//
// function log(message: string) {
//   LogView.addItem(new QListWidgetItem(`${(new Date()).toString()}: ${message}`));
//   LogView.scrollToBottom();
// }
//
// const win = new QMainWindow();
// win.setWindowTitle("Hello World");
// win.setWindowIcon(new QIcon(logo));
// win.setMinimumSize(1280, 720);
//
// const centralWidget = new QWidget();
// centralWidget.setObjectName("myroot");
// const rootLayout = new QGridLayout();
// centralWidget.setLayout(rootLayout);
//
// const LogView = new QListWidget();
// LogView.setAutoScroll(true);
// LogView.setObjectName('logView');
//
// const InputColumn = new QWidget();
// InputColumn.setObjectName('inputColumn')
// const InputColumnLayout = new FlexLayout();
// InputColumn.setLayout(InputColumnLayout);
//
// const TextInput = new QTextEdit();
// TextInput.setAcceptRichText(false);
// TextInput.setObjectName('textInput');
// TextInput.setPlaceholderText('Input invoice/credit memo numbers here');
// TextInput.addEventListener('textChanged', () => {
//   log(TextInput.toPlainText());
// })
//
// const TextInputButton = new QPushButton();
// TextInputButton.setText('Start download');
//
// InputColumnLayout.addWidget(TextInput);
// InputColumnLayout.addWidget(TextInputButton);
//
// rootLayout.setColumnStretch(0, 1);
// rootLayout.setColumnStretch(1, 3);
// rootLayout.setRowStretch(0, 2);
// rootLayout.setRowStretch(1, 1);
//
// rootLayout.addWidget(InputColumn, 0, 0, 2);
// //rootLayout.addWidget(TextInput2, 0, 1);
// rootLayout.addWidget(LogView, 1, 1);
// win.setCentralWidget(centralWidget);
// win.setStyleSheet(
//   `
//     #myroot {
//       background-color: rgb(21, 23, 25);
//       height: '100%';
//     }
//     #inputColumn {
//       height: '100%';
//       flex: 1;
//     }
//     #textInput {
//       flex: 1;
//       background-color: rgba(255, 255, 255, 0.1);
//       color: white;
//     }
//     #logView {
//
//       background-color: black;
//       color: white;
//     }
//   `
// );
// win.show();
//
// (global as any).win = win;

import App from "./App";
import icon from '../assets/logox200.png';

const app = new App({
  title: 'Invoice/Credit Memo Downloader',
  icon,
  width: 1280,
  height: 720,
});

app.addStyleSheet(`
  #root {
    background-color: rgba(21, 23, 25, 0.5);
  }
  
  #console_view {
    alternate-background-color: rgb(21, 23, 25);
    background-color: rgb(11, 13, 15);
    color: white
  }
`);

app.run();

(global as any).app = app;
