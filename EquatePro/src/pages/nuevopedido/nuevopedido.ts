import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//controladores
import { Storage } from '@ionic/storage';
import { ModalController,ViewController } from 'ionic-angular';

//modals 
import { ProductosPage } from '../productos/productos';
import { ProfuctosFacturarPage } from '../profuctos-facturar/profuctos-facturar';

@IonicPage()
@Component({
  selector: 'page-nuevopedido',
  templateUrl: 'nuevopedido.html',
})
export class NuevopedidoPage {

  public id: any;
  public nombre: any;
  public listadocompras:any;

  public total:any = "0.00";
  public subtotal:any = "0.00";
  public descuento:any = "0.00";
  public neto:any = "0.00";
  public impuesto:any = "0.00";
  public pedido =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage, public viewCtrl: ViewController, public modalCtrl: ModalController) {

    this.id = this.navParams.get('clienteid');
    this.nombre = this.navParams.get('clientenombre');

  }

  ionViewDidLoad() {
    
  }

/* mostramos los dos modals */
  Buscar_producto() {
    let modal = this.modalCtrl.create(ProductosPage)
    modal.onDidDismiss(data => {

            let modal2 = this.modalCtrl.create(ProfuctosFacturarPage,{datos:data})

                  modal2.onDidDismiss(data2 => {
                    this.pedido.push(data2);
                    this.calcular()
                  });
           modal2.present();
    });

    modal.present();
  }


  calcular(){

 let tot = 0;
 let sub = 0;
 let des = 0;
 let neto = 0;
 let imp = 0;

    for (let item of this.pedido){
      tot = (1* tot)  + parseFloat(item.total);
      sub = (1* sub) + parseFloat(item.subtotal);
      des = (1* des) + parseFloat(item.descuento);
      neto = (1* neto )+ parseFloat(item.neto);
      imp = (1* imp) + parseFloat(item.impuesto);
    }


    this.total = this.formatNum(tot);
    this.subtotal =this.formatNum( sub);
    this.descuento =this.formatNum( des);
    this.neto = this.formatNum(neto);
    this.impuesto = this.formatNum(imp);

  }


  formatNum(val) {
    val = Math.round(val * 100) / 100;
    val = ("" + val).indexOf(".") > -1 ? val + "00" : val + ".00";
    var dec = val.indexOf(".");
    return dec == val.length - 3 || dec == 0 ? val : val.substring(0, dec + 3);
  }




  

}
