import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the ToastServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastServiceProvider {
  toast: any;//Toast
  constructor(private toastCtrl: ToastController) {
  }

  /**
   * 吐司提示(默认中间)
   */
  showToast(mes: string, position?: string) {

    if (this.toast) {
      this.toast.dismiss();
    }
    this.toast = this.toastCtrl.create({
      message: mes,
      duration: 2000,
      position: position ? position : 'middle'
    });
    this.toast.present();
  }

}
