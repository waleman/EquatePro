import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';


//paginas
import { HomePage } from '../home/home';
//providers
import { ConexionProvider } from '../../providers/conexion/conexion';
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';
//controladores
import { ToastController } from 'ionic-angular';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {






  public usuariodatos =[];
  public usuarioId:any;
  public visitas=[];
  public n1:any;
  public n2:any;
  public n3:any;
  public n4:any;
  public conta:any;
  public keys:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public _conexion:ConexionProvider,public toastCtrl:ToastController,
    public http: Http, public storageCrtl: Storage, public menu: MenuController, public _utilidades: UtilidadesProvider, public loadingCtrl: LoadingController){
    this.checkdata();
    this.menu.swipeEnable(false);
    this.conta = 0;
  }

  ionViewDidLoad() {

  }

 irHome(){
      this.navCtrl.push(HomePage);
 }

/*login*/
 numero(valor:any){
    this.conta = this.conta + 1;
      if(this.conta== 1){
       this.n1="" +valor
       var elem = document.getElementById('primero');  
        // agregar clase  
        elem.classList.add('active');   
      }

      if(this.conta== 2){
        this.n2="" + valor
        var elem = document.getElementById('segundo');  
        // agregar clase  
        elem.classList.add('active');   
       }

       if(this.conta== 3){
        this.n3="" + valor
        var elem = document.getElementById('tercero');  
        // agregar clase  
        elem.classList.add('active');   
       }

       if(this.conta== 4){
        this.n4="" +valor
        var elem = document.getElementById('cuarto');  
        // agregar clase  
        elem.classList.add('active');   
        this.Login()
       }
    
   
 }
/*login*/
 borrar(){
   if(this.conta>= 0){
    if(this.conta== 1){
      this.n1=""
      var elem = document.getElementById('primero');  
       // agregar clase  
       elem.classList.remove('active');   
     }

     if(this.conta== 2){
       this.n2=""
       var elem = document.getElementById('segundo');  
       // agregar clase  
       elem.classList.remove('active');   
      }

      if(this.conta== 3){
       this.n3=""
       var elem = document.getElementById('tercero');  
       // agregar clase  
       elem.classList.remove('active');   
      }

     if (this.conta == 4) {
       this.n4 = ""
       var elem = document.getElementById('cuarto');
       // agregar clase  
       elem.classList.remove('active');
     }

      this.conta = this.conta - 1;

   }
 }

 /*login*/
 clearAll(){
  this.conta = 0;
  document.getElementById('primero').classList.remove('active'); 
  document.getElementById('segundo').classList.remove('active'); 
  document.getElementById('tercero').classList.remove('active'); 
  document.getElementById('cuarto').classList.remove('active'); 
  this.n1=""
  this.n2=""
  this.n3=""
  this.n4=""
 }

/* Funcion para saber si el usuario fue logeado anteriormente */
 checkdata(){
      this.storageCrtl.ready().then(()=>{
        this.storageCrtl.keys().then(data=>{
          if(data){
                     this.keys=data;
                     if(this.keys.includes( 'udata' )){
                        this.irHome()
                     }
                  }
        });
      });
 }



/* Funcion para entrar al sistema si el usuario no se ah logeado anteriormente */
 Login(){

  
  if(!this.n1  || !this.n2 || !this.n3 || !this.n4){
    let err = "Debe llenar todos los campos"
    this.MostarToast(err);
    this.clearAll();
  }else{
    let loader = this.loadingCtrl.create({
      content: "verificando datos ...",
    });
    loader.present();
          let numero = this.n1.concat(this.n2,this.n3,this.n4) ;

          let direccion = this._conexion.Url + "vendedor/pin/" + numero;
            this.http.get(direccion)
          .map(res => res.json())
          .subscribe(data =>{
                  if(!data){
                    this.clearAll();
                    let err = "El PIN ingresado no es valido";
                    this.MostarToast(err);
                  }else{
                    /* si hay data creamos un array con la informacion  del vendedor */
                      if(data.mobilApp){
                        this.usuarioId = data.vendedorId;
                        let  datos ={
                          zonaid:data.zonaId,
                          zona:data.zona,
                          sucursalId:data.sucursalId,
                          sucursal:data.sucursal,
                          nombre:data.nombre,
                          pin:data.pin,
                          rutaId:data.rutaId,
                          ruta:data.ruta,
                          almacenId:data.almacenId,
                          almacen:data.almacen,
                          vendedorId:data.vendedorId
                        }
                        this.usuariodatos.push(datos) ;
                        
                        this.storageCrtl.set("udata", this.usuariodatos)
                        /*llammos la funcion para recolectar las razones de no visita */
                        this. recolectarRazonesNoVisita();
                        /* llamamos la funcion para recolectar las razones de no factura*/
                        this.recolectarRazonesNoFactura();
                        /* llamamos las funcion para recolectar los  clientes */
                        this.RecolectarClientes(data.vendedorId);
                        /* llamamos la funcion para recolectar los precios */
                        this.recolectarPrecios(data.vendedorId)

                      }else{
                        let err = "No tiene permisos para acceder";
                        this.MostarToast(err);
                      }
                  }
          })
        loader.dismiss();
        }
  
 }

/*muestra los errores */
 MostarToast(MensajeError:any){
  let toast = this.toastCtrl.create({
    message: MensajeError,
    duration: 3000,
    showCloseButton: true,
    closeButtonText: "x"
  });
  toast.present();
 }


/*funcion para recolectar los  clientes*/
 RecolectarClientes(idVendedor){
  let diaActual = this._utilidades.BuscarNumerodeDia();
  let direccion = this._conexion.Url + "clientes/" + idVendedor + "/visita/" + diaActual;
  this.http.get(direccion)
  .map(res => res.json())
  .subscribe(data =>{
          if(!data){
            let err = "Error en descargar clientes. Consulte con el administrador del sistema";
            this.MostarToast(err);
          }else{
           // this.storageCrtl.set("clientes",data)
            for( let lista of data){

              /*crear las visitas para cada uno de los clientes */
                  let visita = {
                        clienteId:lista.clienteId,
                        nombre:lista.nombre.split('/')[0],
                        vendedorId: this.usuarioId,
                        visitafecha:new Date().toISOString().slice(0,10),
                        estado:"Inicial",
                        razonId:"",
                        nofacturoId:"",
                        facturo: "",
                        altitud:"",
                        longitud:"",
                        notas:"",
                        creadoPor:"mobil",
                        creadoFecha: new Date().toISOString().slice(0, 10),
                        modificadoPor:"mobil",
                        modificadoFecha: new Date().toISOString().slice(0, 10)
                  };
                  this.visitas.push(visita)
              }
              this.storageCrtl.set("visitas",this.visitas)
              this.irHome();
          } 
      })

 }

/* funcion para recolectar las razones de no visita */
recolectarRazonesNoVisita(){
   let direccion =  this._conexion.Url + "razones/novisitas";
   this.http.get(direccion)
   .map(res => res.json())
   .subscribe(data =>{
           if(!data){
             let err = "Error en descargar la razones. Consulte con el administrador del sistema";
             this.MostarToast(err);
           }else{
             this.storageCrtl.set("noVisita",data)
             
           } 
       })

 }


 recolectarRazonesNoFactura(){
  let direccion =  this._conexion.Url + "razones/nofactura";
  this.http.get(direccion)
  .map(res => res.json())
  .subscribe(data =>{
          if(!data){
            let err = "Error en descargar la razones No factura. Consulte con el administrador del sistema";
            this.MostarToast(err);
          }else{
            this.storageCrtl.set("noFactura",data)
            
          } 
      })

}




/*recolectar todos los precios de los productos */
  recolectarPrecios(idVendedor) {
    let diaActual = this._utilidades.BuscarNumerodeDia();
    let direccion = this._conexion.Url + "vendedor/" + idVendedor + "/dia/" + diaActual+ "/precios/activos";
    this.http.get(direccion)
      .map(res => res.json())
      .subscribe(data => {
        if (!data) {
          let err = "Error en descargar los precios . Consulte con el administrador del sistema";
          this.MostarToast(err);
        } else {

        
          let canalPreciosVenta_array = data['canalPreciosVenta'];
          let canalPreciosVenta = []
          for (let item of canalPreciosVenta_array){
            canalPreciosVenta.push(item);
          } 
          this.storageCrtl.set("canalPreciosVenta", canalPreciosVenta);

          let descuentosVenta_array = data['descuentosVenta'];
          let descuentosVenta = []
          for (let item of descuentosVenta_array){
            descuentosVenta.push(item);
          }
          this.storageCrtl.set("descuentosVenta", descuentosVenta);
          
          let escalasVenta_array = data['escalasVenta'] ;
          let escalasVenta = [];

          for (let item of escalasVenta_array){
            escalasVenta.push(item)
          }
          this.storageCrtl.set("escalasVenta", escalasVenta);



        }
      })

  }





}
