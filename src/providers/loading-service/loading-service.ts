import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the LoadingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingServiceProvider {
  loading: any;
  constructor(private loadingCtrl: LoadingController) {

  }

  /**
     * 显示加载数据背景
     * @param content 显示内容
     */
  showLoading(content?: string) {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        showBackdrop: false,
        spinner: 'bubbles',
        content: content ? content : '数据加载中...'
      });
      this.loading.present();
    }
  }

  /**
   * 隐藏加载背景
   */
  hideLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = '';
    }
  }


  

}
