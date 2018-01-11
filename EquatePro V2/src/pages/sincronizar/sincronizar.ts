import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//pagina 
import { HomePage } from '../home/home';
//providers
import { ConexionProvider } from '../../providers/conexion/conexion';
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';
//controladores
import { ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-sincronizar',
  templateUrl: 'sincronizar.html',
})
export class SincronizarPage {
  public keys:any;
  public vendedorId:any;
  public fechaA : any;
  public cantidadpedidos:any = '0';
  public cantidadClientes:any = '0';
  public cantidadClientesVisitados:any = '0';
  public TipoConexion:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _conexion: ConexionProvider, public _utilidades: UtilidadesProvider, public StrCrl: Storage, public http: Http,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, private networkCtrl: Network) {
    this.datosParaMostrar();
    this.DatosdeUsuario();
    this.fechaA =  this.fecha()
  }
  

 /*recolectar estadisticas */
  datosParaMostrar(){
        this.StrCrl.ready().then(()=>{
            this.StrCrl.keys().then(llaves =>{
              this.keys = llaves;
                  if(this.keys.includes('pedidos')){
                        this.StrCrl.get('pedidos').then(datos => {
                              if (datos == 'none'){
                                this.cantidadpedidos = 0;
                              }else{
                                let cont = 0;
                                for (let item of datos){
                                  cont = cont + 1;
                                }
                                this.cantidadpedidos = cont;
                              }
                        })
                  }else{
                    this.cantidadpedidos = 0;
                  }



              if (this.keys.includes('visitas')){
                this.StrCrl.get('visitas').then(datos =>{
                      let cntcli = 0;
                      let cntvisita = 0;
                      for(let item of datos){
                        cntvisita = cntvisita + 1;
                            if(item['estado'] != 'Inicial'){
                              cntcli = cntcli +1;
                            }
                      }

                  this.cantidadClientes = cntvisita;
                    this.cantidadClientesVisitados = cntcli;

                })
              }

            })
        })



  }
 

  IrMenu(){
    this.navCtrl.push(HomePage);
  }


  /* recolectar el id del vendedor */
  DatosdeUsuario(){
    this.StrCrl.ready().then(()=>{
          this.StrCrl.get("udata").then(data =>{
            let vendedorId
            for ( let items of data){
                  vendedorId = items.vendedorId
            }
            this.vendedorId = vendedorId;
       
          });
    });
  }



  fecha() {
    let fecha = new Date();
    let dd = fecha.getDate();
    let mm = fecha.getMonth() + 1; //January is 0!
    let dia = "";
    let mes = "";
    var yyyy = fecha.getFullYear();
    if (dd < 10) {
      dia = '0' + dd;
    } else {
      dia = "" + dd;
    }
    if (mm < 10) {
      mes = '0' + mm;
    } else {
      mes = "" + mm
    }
    var today = dia + '/' + mes + '/' + yyyy;
    var hora = fecha.getHours() + ":" + fecha.getMinutes();
    let fechacompleta = today + " " + hora;
    return fechacompleta
  }


  /* sincronizar datos  */

  SincronizarVisitas(){
    let loader = this.loadingCtrl.create({
      content: "Descargando datos...",
    });
    loader.present();

    this.TipoConexion = this.networkCtrl.type;
/*verificar que este conectado a internet */
    if (this.TipoConexion == 'none') {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: "Aviso !",
        subTitle: "<p>No dispone de una <b>conexion a internet</b>. Conecte su dispositivo a internet e intente nuevamente</p>",
        buttons: [
          {
            text: 'OK',
            role: 'OK',
          }
        ]
      });
      alert.present();
    }
    else
    {
              let direccion = this._conexion.Url + "visitas/" + this.vendedorId + "/sincronizar";
              this.StrCrl.ready().then(() => {

                      this.StrCrl.get("visitas").then(data => {
                          let aEnviar = {
                            vendedorId: this.vendedorId,
                            visitas: data
                          }
                          this.http.post(direccion, aEnviar)
                            .subscribe(datosRespuesta => {
                              let valor = datosRespuesta.json;
                  

                                        let direccionPedidos = this._conexion.Url + "pedidos/" + this.vendedorId + "/sincronizar";
                                        this.StrCrl.get("pedidos").then(data => {
                                          if (data == 'none') {

                                          } else {
                                            let aEnviar2 = {
                                              vendedorId: this.vendedorId,
                                              fecha: new Date().toISOString().slice(0, 10),
                                              pedidos: data
                                            }
                                            this.http.post(direccionPedidos, aEnviar2)
                                              .subscribe(datosRespuesta => {
                                                let valor2 = datosRespuesta.json;                                     
                                                      this.StrCrl.remove('pedidos');
                                                      this.StrCrl.remove('visitas');
                                                      this.cantidadpedidos   = '0';
                                                      this.cantidadClientes = '0';
                                                      this.cantidadClientesVisitados= '0';
                                              });
                                          }
                                        });

                            });

                        });



              });


      loader.dismiss();

      let alert = this.alertCtrl.create({
        title: "Exelente !",
        subTitle: "<p>Datos sincronizados <b>Correctamente</b>",
        buttons: [
          {
            text: 'Continuar',
            role: 'OK',
          }
        ]
      });
      alert.present();

     }

  }




}
