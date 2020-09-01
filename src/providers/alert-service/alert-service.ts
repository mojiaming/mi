import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertServiceProvider {

  constructor(private alertCtrl: AlertController) {

  }

  showAlert(subTitle: string) {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: subTitle,
      buttons: ['确定']
    });
    alert.present();
  }



  /**
   * 提示框
   */
  showConfirm(title,message,cancelText,okText): Promise<any> {
    return new Promise((resolve) => {
      const confirm = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: cancelText,
            role: "cancel",
            handler: () => {
            }
          },
          {
            text: okText,
            handler: () => {
              resolve('ok');
            }
          }
        ]
      });
      confirm.present();
    })
  }
}
