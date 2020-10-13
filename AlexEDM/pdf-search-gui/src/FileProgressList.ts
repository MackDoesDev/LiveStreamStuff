import {QListWidget, QListWidgetItem, QProgressBar} from "@nodegui/nodegui";
import path from 'path';
import {EventEmitter} from 'events';
import FileProgressItem from "./FileProgressItem";

class FileProgressList extends EventEmitter {
  private readonly _view: QListWidget;
  private _items: FileProgressItem[] = [];

  constructor() {
    super();
    this._view = new QListWidget();
    this._view.setObjectName('file_progress_view');
    this._view.setAlternatingRowColors(true);

    FileProgressItem.searchUrl = '';
    FileProgressItem.downloadTargetDirectory = path.join(process.cwd(), 'download');
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  get view() {
    return this._view;
  }

  async setItems(items: string[]) {
    this._items = [];
    this._view.clear();

    items.forEach(item => {
      const fileProgressItem = new FileProgressItem(item);
      this._items.push(fileProgressItem);
      this._view.addItem(fileProgressItem.item);
    });

    for(const item of this._items) {
      await item.runSearch();
      await this.sleep(4000);
    }
  }
}

export default FileProgressList;