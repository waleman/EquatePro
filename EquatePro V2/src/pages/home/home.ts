import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, LoadingController  } from 'ionic-angular';
import { Http } from '@angular/http';
//paginas

import { LoginPage } from '../login/login';
import { SincronizarPage } from '../sincronizar/sincronizar';
import { ListapedidosPage } from '../listapedidos/listapedidos';

import { MenuvisitasPage } from '../menuvisitas/menuvisitas';
//providers
import { ConexionProvider } from '../../providers/conexion/conexion';
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';


//componentes
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public keys:any;
  public dia:any;
  public cantidad:any;
  public TipoConexion:any;
  public vendedorId: any;
  public visitas = [];

  constructor(public toastCtrl: ToastController, public http: Http, public _conexion: ConexionProvider, public navCtrl: NavController, public _utilidades: UtilidadesProvider,
    public menuCtrl: MenuController, public storageCrtl: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private networkCtrl: Network,
    ) {
   this.dia = this._utilidades.BuscarDIaActual();
    this.menuCtrl.swipeEnable(false);
    this.Datosdeusuario();

  }



  Datosdeusuario(){
    this.storageCrtl.get('udata').then(datos => {
      this.vendedorId = datos.vendedorId;
    });
  }



  irSincronizar(){
    
    this.navCtrl.push(SincronizarPage);
  }


  irMenuVisitas(){
    this.navCtrl.push(MenuvisitasPage);
  }


  irPedidos(){
    this.VerificarSiHayVisitas()
   
  }


  Salir(){
    let alert = this.alertCtrl.create({
      title: "Advertencia !",
      subTitle: "<p>Esta a punto de <b>cerrar sesion</b></p><p> Este proceso borrara sus avances en pedidos y visitas</p> <p> Por su seguridad se recomienda sincronizar sus pedidos antes de continuar</p>",
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
        },
        {
          text: 'Continuar',
          role: 'OK',
          handler: () => {
            this.deleteallData()
          }
        }
      ]
    });
    alert.present();
     
  }



 /*borrar todo en storage*/
  deleteallData(){
    let loader = this.loadingCtrl.create({
      content: "Limpiando datos ...",
    });
    loader.present();

    this.storageCrtl.clear()
    this.navCtrl.push(LoginPage);

    loader.dismiss();

  }

  showMenu(){
    this.menuCtrl.open();
  }



  DescargarDatos(){
    let alert = this.alertCtrl.create({
      title: "Advertencia !",
      subTitle: "<p>Esta a punto de <b>descargar</b> los datos de nuestra nube.</p><p> Esto incluye clientes, promociones,productos y precios.</p> <p> Por su seguridad se recomienda sincronizar sus pedidos antes de continuar</p>",
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
        },
        {
        text: 'Continuar',
        role: 'OK',
        handler: () => {
          this.Descargardatos2() }
        }
    ]
    });
    alert.present();
  }


  Descargardatos2(){

    let loader = this.loadingCtrl.create({
      content: "Descargando datos...",
    });
    loader.present();

    this.TipoConexion = this.networkCtrl.type;
      
        if(this.TipoConexion == 'none'){
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: "Aviso !",
            subTitle: "<p>No dispone de una conexion a internet. Conecte su dispositivo a internet e intente nuevamente</p>",
            buttons: [
              {
                text: 'OK',
                role: 'OK',
              }
            ]
          });
          alert.present();
      
        }else{
            this.storageCrtl.get('udata').then(datos=>{
                this.vendedorId =datos.vendedorId;
            });
          /*llammos la funcion para recolectar las razones de no visita */
          this.recolectarRazonesNoVisita();
          /* llamamos la funcion para recolectar las razones de no factura*/
          this.recolectarRazonesNoFactura();
          /* llamamos las funcion para recolectar los  clientes */
          this.RecolectarClientes(this.vendedorId);
          /* llamamos la funcion para recolectar los precios */
          this.recolectarPrecios(this.vendedorId);
          /*limpiar pedidos */
          let val = 'none'
          this.storageCrtl.set('pedidos', val);
          loader.dismiss();
        }




  }





  /*funcion para recolectar los  clientes*/
  RecolectarClientes(idVendedor) {
    let diaActual = this._utilidades.BuscarNumerodeDia();
    let direccion = this._conexion.Url + "clientes/" + idVendedor + "/visita/" + diaActual;
    this.http.get(direccion)
      .map(res => res.json())
      .subscribe(data => {
        if (!data) {
          let err = "Error en descargar clientes. Consulte con el administrador del sistema";
          this.MostarToast(err);
        } else {
          // this.storageCrtl.set("clientes",data)
          for (let lista of data) {

            /*crear las visitas para cada uno de los clientes */
            let visita = {
              clienteId: lista.clienteId,
              nombre: lista.nombre.split('/')[0],
              vendedorId: this.vendedorId,
              visitafecha: new Date().toISOString().slice(0, 10),
              estado: "Inicial",
              razonId: "",
              nofacturoId: "",
              facturo: "",
              altitud: "",
              longitud: "",
              notas: "",
              creadoPor: "mobil",
              creadoFecha: new Date().toISOString().slice(0, 10),
              modificadoPor: "mobil",
              modificadoFecha: new Date().toISOString().slice(0, 10)
            };
            this.visitas.push(visita)
          }
          this.storageCrtl.set("visitas", this.visitas)

        }
      })

  }

  /* funcion para recolectar las razones de no visita */
  recolectarRazonesNoVisita() {
    let direccion = this._conexion.Url + "razones/novisitas";
    this.http.get(direccion)
      .map(res => res.json())
      .subscribe(data => {
        if (!data) {
          let err = "Error en descargar la razones. Consulte con el administrador del sistema";
          this.MostarToast(err);
        } else {
          this.storageCrtl.set("noVisita", data)

        }
      })

  }


  recolectarRazonesNoFactura() {
    let direccion = this._conexion.Url + "razones/nofactura";
    this.http.get(direccion)
      .map(res => res.json())
      .subscribe(data => {
        if (!data) {
          let err = "Error en descargar la razones No factura. Consulte con el administrador del sistema";
          this.MostarToast(err);
        } else {
          this.storageCrtl.set("noFactura", data)

        }
      })

  }




  /*recolectar todos los precios de los productos */
  recolectarPrecios(idVendedor) {
    let direccion = this._conexion.Url + "vendedor/" + idVendedor + "/dia/" + "4" + "/precios/activos";
    this.http.get(direccion)
      .map(res => res.json())
      .subscribe(data => {
        if (!data) {
          let err = "Error en descargar los precios . Consulte con el administrador del sistema";
          this.MostarToast(err);
        } else {
          let canalPreciosVenta_array = data['canalPreciosVenta'];
          let canalPreciosVenta = []
          for (let item of canalPreciosVenta_array) {
            canalPreciosVenta.push(item);
          }
          this.storageCrtl.set("canalPreciosVenta", canalPreciosVenta);

          let descuentosVenta_array = data['descuentosVenta'];
          let descuentosVenta = []
          for (let item of descuentosVenta_array) {
            descuentosVenta.push(item);
          }
          this.storageCrtl.set("descuentosVenta", descuentosVenta);

          let escalasVenta_array = data['escalasVenta'];
          let escalasVenta = [];

          for (let item of escalasVenta_array) {
            escalasVenta.push(item)
          }
          this.storageCrtl.set("escalasVenta", escalasVenta);



        }
      })

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



  VerificarSiHayVisitas(){
    let valor;
    this.storageCrtl.ready().then(()=>{
            this.storageCrtl.keys().then( llaves =>{
                    this.keys = llaves;
                   if (this.keys.includes('visitas')){
                      this.navCtrl.push(ListapedidosPage); 
                   }else{
                        let err = "Aviso! Para continuar debe descargar los datos del dia. Precione el boton de enlace con el servidor";
                        this.MostarToast(err);

                   }
            });
    });


 

  }


}
