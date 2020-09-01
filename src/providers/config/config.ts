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
  static FILE_URL: string = 'http://192.168.10.1:8080/file';
  static API_URL: string = 'http://192.168.10.1:8080';
  static WS_API: string = 'http://api.vephp.com';
  static APP_API: string = 'http://192.168.10.1:8080/download';

  // 微信应用

  getHeaders(): any {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.stoargeService.read('token') ? this.stoargeService.read('token') : '',
      }
    };
  }

  getFormHeaders(): any {
    return {
      headers: {
        'responseType': 'json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
  }
}


export const CODE_PUSH_DEPLOYMENT_KEY = {
  'android': {     
    'Production': 'rh_1nL6jTFPD09bI6aG2f1mM96b1458c1fc1--42af-921e-6ba60824d8b1',
    'Staging': 'RuLutg8obRyKNCYUKMKjbZKzF2MB458c1fc1-99af-921e-6ba60824d8b1'
  },
  'ios': {
    'Production': '你的ios Production key',
    'Staging': '你的ios Staging key'
  }
};

export const IS_DEBUG = false;
