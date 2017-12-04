import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-nuevopedido',
  templateUrl: 'nuevopedido.html',
})
export class NuevopedidoPage {

  public id: any;
  public nombre: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.id = this.navParams.get('clienteid');
    this.nombre = this.navParams.get('clientenombre');


    console.log(this.id,this.nombre);
  }

  ionViewDidLoad() {
    
  }

}
