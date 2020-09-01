import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the CustomerServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-service',
  templateUrl: 'customer-service.html',
})
export class CustomerServicePage {

  constructor(private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
