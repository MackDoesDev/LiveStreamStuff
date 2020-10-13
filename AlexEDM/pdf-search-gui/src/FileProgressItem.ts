import fs from 'fs';
import path from 'path';
import axios from 'axios';
import {QListWidgetItem} from "@nodegui/nodegui";
import Console from './Console';

class FileProgressItem {
  static searchUrl: string = '';
  static downloadTargetDirectory: string;
  static console: Console;

  private readonly _text: string;
  private readonly _item: QListWidgetItem;
  private _cookie: string = '';

  constructor(text: string) {
    this._text = text;
    this._item = new QListWidgetItem(this._text);
  }

  get item() {
    return this._item;
  }

  requestLegacySearch = async () => axios.request({
    url: FileProgressItem.searchUrl,
    method: 'post',
    data: `SearchString=${this._text}&Action=Go`,
  });

  requestSearch = async (page: number = 1) => {
    const requestConfig: {[key: string]: any} = {
      url: `${FileProgressItem.searchUrl}?qu=${this._text}&Advanced=&sc=%2F&pg=${page}&RankBase=1000`,
      method: 'get'
    };

    if (this._cookie) {
      requestConfig.headers = {
        Cookie: `${this._cookie}`,
      };
    }

    return axios.request(requestConfig);
  }

  async runSearch() {
    console.log('start searching');
    FileProgressItem.console.log(`Start searching for ${this._text}`);
    const searchResult = await this.requestLegacySearch();
    const cookieRegExp = /^(.*?);/im;
    this._cookie = cookieRegExp.exec(searchResult.headers['set-cookie'][0])![1];

    return this.parseSearchResult(searchResult.data);
  }

  async parseSearchResult(result: string, page = 1): Promise<boolean> {
    const codeRegex = new RegExp(`<a[^>]*?javascript:NAF\\('(.*?${this._text}.*?(?:invoice|credit memo)\\.pdf)'.*?\\)[^>]*?>`, 'gi');
    const nextRegex = /"Next \d.*? documents"/im;
    let lastLink = '';
    let found = false;

    FileProgressItem.console.log(`Searching on page: ${page}`);

    let match: RegExpExecArray | null;
    while (match = codeRegex.exec(result)) {
      const link = match[1];
      if (link != lastLink) {
        await this.downloadFile(match[1]);
        found = true;
        lastLink = link;
      }
    }

    if (!found && nextRegex.test(result)) {
      const searchResult = await this.requestSearch(page + 1);
      return this.parseSearchResult(searchResult.data, page + 1);
    }

    return found;
  }

  async downloadFile(url: string) {
    FileProgressItem.console.log(`Downloading file: ${path.basename(url)}`);
    const filename = path.basename(url).replace(":", "_");
    const file = fs.createWriteStream(path.join(FileProgressItem.downloadTargetDirectory, filename));

    const response = await axios.request({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(file);

    return new Promise((resolve, reject) => {
      file.on('finish', resolve);
      file.on('error', reject);
    });
  }
}

export default FileProgressItem;