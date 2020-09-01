import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ProblemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-problem',
  templateUrl: 'problem.html',
})
export class ProblemPage {

  data: Array<{title: string,important: string, details: string, icon: string, showDetails: boolean}> = [];

  constructor(public navCtrl: NavController) {
    this.data.push({
      title: '复制了平台回复的淘口令下单，个人中心没有订单？',
      important:'',
      details: '如果复制平台回复的淘口令下的单，个人中心-我的订单却没有，请下单后半小时左右再进行查看，系统会自动绑定订单。如果半小时后还是没看到订单，请把订单号发给客服咨询。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '蜜淘平台公众号作用',
      important:'',
      details: '蜜淘平台是淘宝天猫购物返利的微信公众号。提供天猫淘宝购物返利+优惠卷查询。独享折扣商品，最新最全优惠信息等服务。把天猫淘宝商品分享到平台就可以领取返利和商品优惠卷。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '分享给朋友有提成吗？',
      important:'有的。',
      details: '您可以在平台的菜单生成您的二维码推广海报。您的朋友通过识别扫描二维码推广海报关注到公众号，您可以获得一级推广订单佣金20%提成，如果你的朋友再推给其他人关注，您也可以获得二级佣金10%。也就是你每介绍一位朋友关注平台，他每次在淘宝购物你都能获得佣金，既能省钱又能赚钱，赶快分享起来吧。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '淘宝天猫所有的商品都有返利吗？',
      important:'',
      details: '淘宝天猫90%的商品都参加了推广计划，所以90%的商品都有返利，返利的比率还比较高。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '返利金额从哪里来，是我多付钱了吗？',
      important:'不是的。',
      details: '蜜淘平台返利来自于淘宝天猫商家合作，商家提供给平台的推广导购佣金。蜜淘平台将所得的佣金返回给平台的用户，让您购物更加省钱！您或许会问：“这些卖家是不是把价格提高然后售给消费者。”不是的，你不使用平台也是那个价格，使用了就有优惠卷和返利。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '为什么有返利？',
      important:'',
      details: '返利是商家的推广费，这是淘宝天猫店铺必须的成本开支。举个例子：您要在淘宝天猫上购买一件衣服，价格是100元。那么无论您是否在本平台获取淘口令购买，您都要付100元。而通过分享微信到平台，可以领取5-50元的优惠卷和返利。这就是剩下来的钱，何乐而不为呢？',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '返利是返现金吗？',
      important:'是的，随时可以提现。',
      details: '用户领取优惠卷下单确认收货后，返利是到平台你的个人钱包，用户可以随时提现到银行卡，微信，支付宝的。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '你们是不是骗子？',
      important:'',
      details: '先声明，我们平台不是商店，不出售任何商品。我们仅与淘宝天猫内部合作，起着导购和返利服务。我们只是帮您查询您要购物的商品的优惠卷和返利，下单您还是在手机淘宝下单的。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '使用你们平台会泄露我们的信息吗？',
      important:'',
      details: '这个请放心，我们只是帮您查询您要购物的商品的优惠卷和返利，淘宝不会把信息给我们平台，我们也不会有会员的信息。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '为什么微信里总是提示“在浏览器中打开”？',
      important:'',
      details: '点击网页版链接就会提示在浏览器中打开，手机用户只要复制平台回复的整段信息打开手机淘宝，手机淘宝会自动识别淘口令打开商品的。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '不在浏览器中打开可以吗？',
      important:'可以，使用淘口令。',
      details: '在微信中复制一段文字（包含淘口令），然后打开手机淘宝，就可以完成领劵下单。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '淘口令是什么？',
      important:'',
      details: '复制平台回复的淘口令，打开手机淘宝，淘宝根据淘口令自动识别商品。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });

    this.data.push({
      title: '用蜜淘平台安全吗？',
      important:'',
      details: '再次强调，平台返利不参与交易，只提供返利+优惠卷信息。所以，在蜜淘平台您的账号不会存在任何风险。',
      icon: 'ios-add-circle-outline',
      showDetails: false
    });
  }

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        this.data.forEach(element => {
          element.showDetails = false;
          element.icon = 'ios-add-circle-outline';
        });
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }


}
