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
 public clienteid:any;
  public datos: any;
  public _id: any;
  public _codigo: any;
  public _producto: any;
  public _cantidad: any;
  public _precioCosto: any;
  public _impuesto: any;
  public _canal:any;
  public almacenid:any;
  public cantidad: number = 1;
  public impuesto: any = '0.00';
  public subtotal: any = '0.00';
  public neto: any = '0.00';
  public total: any = '0.00';
  public descuento: any = '0.00';
  public medida: any;
  public ListaPrecios = [];
  public tipoprecio: any;
  public unidades: any;
  public precio: any = '0.00';
  public precioId: any;

  //decuento por canal
  public porcentajeDescuento:any  = '0' ;
  //decuento por escala
  public porcentajeDescuentoEscala: any = '0';
  //decuento por ventas
  public porcentajeDescuentoVentas: any = '0';
  public RemplazarDescuento :any;

  //escalas por productos
  public escalasProducto =[];
  //descuentos por ventas
  public descuentosVentas = [];

  public pedido = {
    productoid: "",
    producto: "",
    almacenId: "",
    precioid: "",
    cantidad: 0,
    unidades: 0,
    precio: 0,
    subtotal: 0,
    porcentajeImpuesto: "",
    impuesto: 0,
    tipoprecio: "",
    porcentajeDescuento: 0,
    descuento: 0,
    total: 0,
    precioCosto: "",
    totalCosto: 0,
    neto: 0,

  };





  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage, public viewCtrl: ViewController, public toastCtrl: ToastController) {
    this.clienteid = this.navParams.get('clienteid');
    this.datos = this.navParams.get('datos')
    this._id = this.datos['productoId'];
    this._codigo = this.datos['codigo'];
    this._producto = this.datos['producto'];
    this._cantidad = this.datos['inventario'];
    this._precioCosto = this.datos['precioCosto'];
    this._impuesto = this.datos['porcentajeImpuesto'];
    this._canal = this.datos['canalId'];
    this.precio = this.datos['precio'];
    this.precioId = this.datos['precioId'];
    this.medida = this.datos['medida'];
    this.unidades = this.datos['unidades'];
    this.porcentajeDescuento = this.datos['descuento'];
    this.BuscarEscalasparaElProducto();
    this.VerificarCantidades();
    this.BuscarAlmacen();
    this.BuscarDescuentosPorVentasDeproducto();

  }

  ionViewDidLoad() {

  }





  BuscarAlmacen(){
    this.storageCrtl.ready().then(()=>{
      this.storageCrtl.get("udata").then(data =>{
            let valor=""
              for(let item of data){
                valor =item.almacenId;
              }
        this.almacenid = valor;
        
      })
    })
  }





  VerificarCantidades() {
    if (this.cantidad <= 0 ){
     this.cantidad = 1;
    }else{
      if (this.cantidad )
      this.Calcular();
    }

    
  }

//escalas todas las escalas
  BuscarEscalasparaElProducto(){
     this.storageCrtl.ready().then(()=>{
       this.storageCrtl.get('escalasVenta').then(data =>{
            for ( let items of data ){
              if (items.productoId == this._id ){
                this.escalasProducto.push(items);
              }
            }
       });
     });

 
  }

  //buscar descuentos por cantidad en las escalas
 BuscarDescuentosPorEscala(cantidad:number){
   for (let items of this.escalasProducto){
     if (cantidad >= items.cantidadMin && cantidad <= items.cantidadMax ){
       this.porcentajeDescuentoEscala = items.descuento;
     }
    
   }  
 }

 // decuentos por ventas
BuscarDescuentosPorVentasDeproducto(){
   this.storageCrtl.ready().then(()=>{
     this.storageCrtl.get('descuentosVenta').then(datos =>{
          for(let items of datos){
            if (items.clienteId == this.clienteid){
              this.descuentosVentas.push(items);
            }
          }
     });
   });
}

  //buscar descuentos por cantidad en las escalas
  BuscarDescuentosPorVentas() {
    for (let items of this.descuentosVentas) {

      this.porcentajeDescuentoVentas = items.descuento;
      this.RemplazarDescuento = items.reemplazaEscala;

    }

  }




  Calcular() {

    this.cantidad = this.Nodecimales(this.cantidad);

    this.BuscarDescuentosPorEscala(this.cantidad);
    this.BuscarDescuentosPorVentas();
    let tot = 0;
    let sub = 0;
    let des = 0;
    let neto = 0;
    let imp = 0;
    let precio = 0;
    let cantidad = 0;
    let porimpuesto = 0;
    

   //calcular subtotal
    precio = this.precio;
    cantidad = this.cantidad;
    sub = precio * cantidad
   //calcular descuento
        //decuento de canal
          let pordescuento = 0;
          pordescuento = this.porcentajeDescuento ;
          let desCanal = sub * pordescuento;
         
         //decuento por escala 
          if (this.RemplazarDescuento == 'true'){
           this.porcentajeDescuentoEscala == 0;
          }
          let porDescuentoEscala = 0;
          porDescuentoEscala = this.porcentajeDescuentoEscala;
          let desEscala = sub * porDescuentoEscala;


          //descuento por venta
        let porDescuentoVentas = 0;
         porDescuentoVentas = this.porcentajeDescuentoVentas;
        let desVentas = sub * porDescuentoVentas; 
         


        //Total decuentos
       let sumDescuentos = (desVentas + desEscala + desCanal);
 

   
    //calcular imnpuestos
    des = sumDescuentos;
    neto = sub - sumDescuentos;
    porimpuesto = this._impuesto;
    imp = neto * porimpuesto;
    tot = neto + imp;



    this.subtotal = sub;
    this.descuento = des;
    this.neto = neto;
    this.impuesto = imp;
    this.total = tot;
 
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


  ocultar() {
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


  Tomarpedido() {
    this.Calcular();

    if (!this.precio) {
      let err = "Debe seleccionar un tipo de precio para continuar."
      this.MostarToast(err);
    } else {
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



      this.pedido.productoid = this._id;
      this.pedido.producto = this._producto;
      this.pedido.almacenId = this.almacenid
      this.pedido.precioid = this.precioId;
      this.pedido.cantidad = this.cantidad;
      this.pedido.unidades = this.unidades;
      this.pedido.precio = this.precio;
      this.pedido.subtotal = this.subtotal;
      this.pedido.porcentajeImpuesto = this._impuesto;
      this.pedido.impuesto = this.impuesto;
      this.pedido.tipoprecio = this.tipoprecio
      this.pedido.porcentajeDescuento= 0; //cambiar por el porcentaje real
      this.pedido.descuento = this.descuento;
      this.pedido.total = this.total;
      this.pedido.precioCosto = this._precioCosto;
      this.pedido.totalCosto = this._precioCosto * this.cantidad;
      this.pedido.neto = this.neto;


      let array = {
        pedidos: this.pedido,
        canal: this._canal
      }


      this.viewCtrl.dismiss(array);



    }




  }




}
