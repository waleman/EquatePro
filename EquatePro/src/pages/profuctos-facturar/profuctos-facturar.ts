import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-profuctos-facturar',
  templateUrl: 'profuctos-facturar.html',
})
export class ProfuctosFacturarPage {

  public datos :any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.datos = this.navParams.get('datos')
    console.log(this.datos)
  }

  ionViewDidLoad() {
    
  }


  

}
