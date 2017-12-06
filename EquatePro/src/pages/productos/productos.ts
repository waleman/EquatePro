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


  SeleccionarProductosdeLocalStrorage() {
    this.storageCtrl.get('productosVenta').then(datos => {
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



  }


