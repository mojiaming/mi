import { Component , ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('scroll') scrollElement: any;
  @ViewChild('spinner') spinnerElement: any;

  categories: Array<any> = [];
  selectedMenuTarget: any;
  products: Array<any> = [];
  hasmore = true;

  islock = false;

  params = {
    cid: 16,
    pageNo: 1
  }

  constructor(public navCtrl: NavController,
    private http: HttpClient) {

  }

  ionViewDidLoad() {
    this.getCategories();
    this.addScrollEventListener();
  }

  addScrollEventListener() {
    this.scrollElement._scrollContent.nativeElement.onscroll = event => {
      if (this.spinnerElement) {
        //元素顶端到可见区域顶端的距离
        var top = this.spinnerElement.nativeElement.getBoundingClientRect().top;
        //可见区域高度
        var clientHeight = document.documentElement.clientHeight;
        if (top <= clientHeight) {
          console.log("ready loadmore...");
        }
      }
    }
  }

  // 获取左侧菜单
  getCategories() {
    this.http.get('assets/file/class.json').subscribe(rs => {
      this.categories = rs['classs'];
      //默认获取第一个分类的商品列表
      this.params.cid = this.categories[0].cid;
      this.products = this.categories[0].childs;
    })
  }

  // 选中左侧菜单
  itemClick(c, event) {

    var initSelected: any = document.getElementsByClassName('menuItem');
    if (initSelected[0].classList.contains("active")) {
      initSelected[0].classList.remove("active")
    }

    //移除上次选中菜单的样式
    if (this.selectedMenuTarget) {
      this.selectedMenuTarget.classList.remove("active")
    }

    //修改本次选中菜单的样式
    event.currentTarget.classList.add("active");

    //将本次选中的菜单记录
    this.selectedMenuTarget = event.currentTarget;

    this.hasmore = true;

    this.params.cid = c.cid;
    this.products = c.childs;
    this.params.pageNo = 1;
  }


  /**
   * 点击事件
   * @param item 
   */
  onItem(item){
    let name = item.name;
    if(this.params.cid == 16){
      name += '女装';
    } else if(this.params.cid == 20){
      name += '男装';
    }
    this.navCtrl.push('GoodsListPage', { value: name });
  }


   /**
   * 搜索事件 
   */
  onSearch() {
    this.navCtrl.push('SearchPage');
  }

}
