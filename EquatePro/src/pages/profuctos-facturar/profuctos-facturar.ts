import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//controladores
import { Storage } from '@ionic/storage';
import { NgProbeToken } from '@angular/core/src/application_ref';
import { ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';



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
  public neto:any ='0.00';
  public total:any= '0.00';
  public descuento:any= '0.00';
  public medida:any;

  public ListaPrecios=[];
  public tipoprecio :any ;
  public unidades:any;
  public precio:any='0.00';
  public precioId:any;

  public pedido = {
      producto:"",
      productoid:"",
      precioid:"",
      tipoprecio:"",
      precio:0,
      cantidad:0,
      subtotal:0,
      descuento:0,
      neto:0,
      impuesto:0,
      total:0
  };





  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage, public viewCtrl: ViewController, public toastCtrl: ToastController) {
    this.datos = this.navParams.get('datos')
    this._id = this.datos['productoId'];
    this._codigo = this.datos['codigo'];
    this._producto = this.datos['producto'];
    this._cantidad = this.datos['cantidad'];
    this._precioCosto = this.datos['precioCosto'];
    this._impuesto = this.datos['porcentajeImpuesto'];


    this.RecolectarPrecios(this._codigo, this._codigo);
  }

  ionViewDidLoad() {
    
  }
RecolectarPrecios(productoCodigo,tipoprecio){

  this.storageCrtl.ready().then(() => {
    this.storageCrtl.get("precios").then(data => {
            for(let valores of data){
                if(valores.productoId == this._id){
                  this.ListaPrecios.push(valores);
                }
             
            }
       });
      });
}


SeleccionarPrecio(){
  for(let val of this.ListaPrecios){
    if (val["precioId"] == this.tipoprecio ){
        this.precio = val.precio;
        this.precio = this.formatNum(this.precio);
        this.unidades = val.unidades
        this.precioId = val.precioId;
      this.Calcular()
    }
  }
 
} 


VerificarCantidades(){

  this.Calcular();
}


Calcular(){
  this.cantidad = this.Nodecimales(this.cantidad);


  this.subtotal = this.precio * this.cantidad;
  this.subtotal = this.formatNum(this.subtotal);
  this.neto = this.subtotal - this.descuento;
  this.neto = this.formatNum(this.neto);
  this.impuesto = this.neto * this._impuesto;
  this.impuesto = this.formatNum(this.impuesto);
  this.total =  this.neto - this.impuesto;
  this.total = this.formatNum(this.total);


}


 formatNum(val) {
  val = Math.round(val * 100) / 100;
  val = ("" + val).indexOf(".") > -1 ? val + "00" : val + ".00";
  var dec = val.indexOf(".");
  return dec == val.length - 3 || dec == 0 ? val : val.substring(0, dec + 3);
}

  Nodecimales(val) {
    val = Math.round(val);
    return val;
  }


  ocultar(){
    this.viewCtrl.dismiss();
  }


  /*muestra los errores */
  MostarToast(MensajeError: any) {
    let toast = this.toastCtrl.create({
      message: MensajeError,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "x"
    });
    toast.present();
  }


  Tomarpedido(){

    if (!this.tipoprecio) {
          let err = "Debe seleccionar un tipo de precio para continuar."
          this.MostarToast(err);          
        }else{
                if (this.cantidad > this._cantidad) {
                  this.cantidad = this._cantidad;
                  let err = "La cantidad seleccionada supera el inventario. el valor se corregira automaticamente"
                  this.MostarToast(err);
                }

                if (this.cantidad <= 0) {
                  this.cantidad = 1;
                  let err = "La cantidad seleccionada debe ser mayor a 0. el valor se corregira automaticamente"
                  this.MostarToast(err);
                }


               this.pedido.cantidad = this.cantidad;
               this.pedido.producto = this._producto;
               this.pedido.productoid = this._id;
               this.pedido.precioid = this.precioId;
               this.tipoprecio =this.tipoprecio 
               this.pedido.precio = this.precio;
               this.pedido.precioid = this.precioId;
               this.pedido.subtotal = this.subtotal;
               this.pedido.descuento = this.descuento;
               this.pedido.neto = this.neto;
               this.pedido.impuesto = this.impuesto;
               this.pedido.total = this.total;

               this.viewCtrl.dismiss(this.pedido);





        }




  }




}
