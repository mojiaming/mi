import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the TbAuthorizaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tb-authoriza',
  templateUrl: 'tb-authoriza.html',
})
export class TbAuthorizaPage implements OnInit {
  secUrl:any = ''; // 安全链接
  canLeave:boolean = false;//是否可以离开页面
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private viewCtrl: ViewController) {
      
  }
  ngOnInit() {
    this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get("url"));
  }

  ionViewDidLoad() {
   
  }

  ionViewCanLeave() {
    return this.canLeave;
  }

  onClose(){
    this.canLeave = true;
    this.viewCtrl.dismiss(true)
  }
}
