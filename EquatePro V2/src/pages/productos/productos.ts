import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//contorladoreas 
import { Storage } from '@ionic/storage';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

  public listadeproductos:any;
  public listamostrar:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCtrl: Storage, public viewCtrl: ViewController) {
    this.SeleccionarProductosdeLocalStrorage();
    this.mostrartodos();
  }
 

  ionViewDidLoad() {
    
  }



  /*Buscar los productos que fueron guardados en el login */
  SeleccionarProductosdeLocalStrorage() {
    this.storageCtrl.get('canalPreciosVenta').then(datos => {
      this.listadeproductos = datos;
      this.listamostrar = datos;
      
    })
  }




/*Filtrar */
  getItems(ev: any) {
    let val = ev.target.value;
        if (val && val.trim() != '') {
                this.listamostrar = this.listadeproductos.filter((item) => {
                  let value = (item.producto.toLowerCase().indexOf(val.toLowerCase()) > -1);
                  return (item.producto.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
        } else {
          this.mostrartodos();
        }
  }


/* moostrar todos los productos */

mostrartodos(){
  this.listamostrar = this.listadeproductos;
}


Facturar(item){
  this.viewCtrl.dismiss(item);
}


  formatNum(val) {
    val = Math.round(val * 100) / 100;
    val = ("" + val).indexOf(".") > -1 ? val + "00" : val + ".00";
    var dec = val.indexOf(".");
    return dec == val.length - 3 || dec == 0 ? val : val.substring(0, dec + 3);
  }



  }


