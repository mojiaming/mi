import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the OpenUrlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 在程序中打开url
 */

@IonicPage({
  name: 'OpenUrlPage',
  segment: 'open-url/:value'
})
@Component({
  selector: 'page-open-url',
  templateUrl: 'open-url.html',
})
export class OpenUrlPage {
  secUrl = null;//安全链接
  title = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sanitizer: DomSanitizer) {
    this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get('value'));
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
  }

  onBack(){
    this.navCtrl.pop();
  }

}
