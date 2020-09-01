import { SearchPage } from './../search/search';
import { Component, ViewChild } from '@angular/core';

// import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavParams } from 'ionic-angular';
import { Tabs } from "ionic-angular";
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ContactPage;

  constructor(private navParam: NavParams) {

  }

  ionViewDidLoad(){
    if(this.navParam.get('value')){
      this.tabs.select(this.navParam.get('value'));
    }
  }
}
