import { StorageServiceProvider } from './../storage-service/storage-service';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  constructor(
    private stoargeService: StorageServiceProvider) {

  }

  //ip地址
  // 文件访问地址
  static FILE_URL: string = 'http://192.168.10.1:8080/file';
  // // 接口请求地址
  static API_URL: string = '../assets/json';
  //  接口请求地址
  // static API_URL: string = 'http://192.168.10.1:8080';
  //app下载地址
  static DOWNLOAD_URL: string = 'http://192.168.10.1:8080/download';

  /**
   * json请求头
   */
  getHeaders(): any {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.stoargeService.read('token') ? this.stoargeService.read('token') : '',
      }
    };
  }

  /**
   * form请求头
   */
  getFormHeaders(): any {
    return {
      headers: {
        'responseType': 'json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
  }
}


/**
 * 热更新key
 */
export const CODE_PUSH_DEPLOYMENT_KEY = {
  'android': {
    'Production': 'rh_1nL6jTFPD09bI6aG2f1mM96b14581--42af-921e-6ba60824d8b1',
    'Staging': 'RuLutg8obRyKNCYUKMKjbZKzF2MB41fc1-99af-921e-6ba60824d8b1'
  },
  'ios': {
    'Production': '你的ios Production key',
    'Staging': '你的ios Staging key'
  }
};

export const IS_DEBUG = false;
