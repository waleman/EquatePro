import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//controladores
import { Storage } from '@ionic/storage';
import { ModalController,ViewController } from 'ionic-angular';

//modals 
import { ProductosPage } from '../productos/productos';
import { ProfuctosFacturarPage } from '../profuctos-facturar/profuctos-facturar';


//paginas 
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-nuevopedido',
  templateUrl: 'nuevopedido.html',
})
export class NuevopedidoPage {

  public id: any;
  public nombre: any;
  public listadocompras:any;
  public keys:any;
  public total:any = "0.00";
  public subtotal:any = "0.00";
  public descuento:any = "0.00";
  public neto:any = "0.00";
  public impuesto:any = "0.00";
  public totalCosto:any;
  public pedido =[];
  public notas:any;
  public pedidoGuardar={
      clienteId:"",
      nombre:"",
      fechaPedido:"",
      subtotal:"",
      impuesto:"",
      descuento:"",
      total:"",
      totalCosto:"",
      notas:"",
      productos:[]
  }


  ;


  public pedidosanteriores = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage, public viewCtrl: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController) {

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
                    console.log(data2)
                    this.calcular()
                  });
           modal2.present();
    });

    modal.present();
  }


  salir(){
    let alert = this.alertCtrl.create({
      title: "Correcto",
      subTitle: "Pedido Guardado exitosamente",
      buttons: [{
        text: 'OK',
        role: 'OK',
        handler: () => {
          this.iraMenu()
        }
      }
      ]
    });
    alert.present();

  }


  iraMenu(){

    this.navCtrl.push(HomePage)
  }


  calcular(){

 let tot = 0;
 let sub = 0;
 let des = 0;
 let neto = 0;
 let imp = 0;
 let totcosto = 0;

    for (let item of this.pedido){
      tot = (1* tot)  + parseFloat(item.total);
      sub = (1* sub) + parseFloat(item.subtotal);
      des = (1* des) + parseFloat(item.descuento);
      neto = (1* neto )+ parseFloat(item.neto);
      imp = (1* imp) + parseFloat(item.impuesto);
      totcosto = (1 * totcosto) + parseFloat(item.totalCosto);
    }


    this.total = this.formatNum(tot);
    this.subtotal =this.formatNum( sub);
    this.descuento =this.formatNum( des);
    this.neto = this.formatNum(neto);
    this.impuesto = this.formatNum(imp);
    this.totalCosto = this.formatNum(totcosto);
  }


  formatNum(val) {
    val = Math.round(val * 100) / 100;
    val = ("" + val).indexOf(".") > -1 ? val + "00" : val + ".00";
    var dec = val.indexOf(".");
    return dec == val.length - 3 || dec == 0 ? val : val.substring(0, dec + 3);
  }


  


  guardar(){


    
    this.pedidoGuardar.clienteId = this.id;
    this.pedidoGuardar.nombre = this.nombre
    this.pedidoGuardar.fechaPedido = new Date().toISOString().slice(0, 10),
    this.pedidoGuardar.subtotal = this.subtotal ;
    this.pedidoGuardar.impuesto = this.impuesto;
    this.pedidoGuardar.descuento = this.descuento ;
    this.pedidoGuardar.total = this.total ;
    this.pedidoGuardar.totalCosto = this.totalCosto ;
    this.pedidoGuardar.notas = this.notas ;
    this.pedidoGuardar.productos = this.pedido ;


  /*seleccionar los pedidos anteriormente guardados  */
   this.storageCrtl.ready().then(()=>{
     this.storageCrtl.keys().then(data => {
        this.keys = data
       if (this.keys.includes('pedidos')) {

         
          this.storageCrtl.get('pedidos').then(val =>{
            let arreglo = []
            if(val == 'none'){
              arreglo.push(this.pedidoGuardar);
              this.pedidosanteriores = arreglo;
              this.storageCrtl.set('pedidos', this.pedidosanteriores);
            }else{
             
              for (let lista of val) {
                arreglo.push(lista);
              }
              arreglo.push(this.pedidoGuardar);
              this.pedidosanteriores = arreglo;
              this.storageCrtl.set('pedidos', this.pedidosanteriores);
            }
           
          })
       }else{
         this.pedidosanteriores.push(this.pedidoGuardar);
         this.storageCrtl.set('pedidos', this.pedidosanteriores);
       }
       this.salir()
     })
   })


  }



  

}
