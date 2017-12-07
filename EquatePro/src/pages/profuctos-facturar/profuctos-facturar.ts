import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-profuctos-facturar',
  templateUrl: 'profuctos-facturar.html',
})
export class ProfuctosFacturarPage {

  public datos :any;

  public _id:any;
  public _codigo:any;
  public _producto:any;
  public _cantidad:any;
  public _precioCosto:any;
  public _impuesto:any;

  public cantidad:number = 1;
  public impuesto:any= '0.00';
  public subtotal:any= '0.00';
  public total:any= '0.00';
  public descuento:any= '0.00';




  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.datos = this.navParams.get('datos')
    this._id = this.datos['productoId'];
    this._codigo = this.datos['codigo'];
    this._producto = this.datos['producto'];
    this._cantidad = this.datos['cantidad'];
    this._precioCosto = this.datos['precioCosto'];
    this._impuesto = this.datos['porcentajeImpuesto'];

  }

  ionViewDidLoad() {
    
  }




}
