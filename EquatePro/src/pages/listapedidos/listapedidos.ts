import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//paginas
import { HomePage } from '../home/home';
//controladores
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-listapedidos',
  templateUrl: 'listapedidos.html',
})
export class ListapedidosPage {

  public listaPedidos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage) {
    this.buscarPedidos()
  }

  ionViewDidLoad() {
   
  }

  IrMenu(){
       this.navCtrl.push(HomePage);
  }

  buscarPedidos(){
      this.storageCrtl.ready().then(()=>{
           this.storageCrtl.get('pedidos').then(valores =>{
                  for( let item of valores){
                    this.listaPedidos.push(item);
                  }
           })
      })
  }
  

}
