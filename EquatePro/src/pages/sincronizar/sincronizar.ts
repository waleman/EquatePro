import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//pagina 
import { HomePage } from '../home/home';
//providers
import { ConexionProvider } from '../../providers/conexion/conexion';
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';
//controladores
import { ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-sincronizar',
  templateUrl: 'sincronizar.html',
})
export class SincronizarPage {

  public vendedorId:any;
  public fechaA : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _conexion: ConexionProvider, public _utilidades: UtilidadesProvider, public StrCrl: Storage, public http: Http) {
    this.DatosdeUsuario();
    this.fechaA =  this.fecha()
  }
  

  ionViewDidLoad() {
    
  }

  IrMenu(){
    this.navCtrl.push(HomePage);
  }

  DatosdeUsuario(){
    this.StrCrl.ready().then(()=>{
          this.StrCrl.get("udata").then(data =>{
            this.vendedorId =data["vendedorId"];
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



  SincronizarVisitas(){
    let direccion = this._conexion.Url + "visitas/" + this.vendedorId + "/sincronizar";
    
      this.StrCrl.ready().then(() => {

          this.StrCrl.get("visitas").then(data => {
                let aEnviar = {
                  vendedorId: this.vendedorId,
                  visitas: data
                }
                console.log(aEnviar)
                this.http.post(direccion, aEnviar)
                  .subscribe(datosRespuesta => {
                    console.log(datosRespuesta);
                   });

          });

      let direccionPedidos = this._conexion.Url + "pedidos/" + this.vendedorId +"/sincronizar" ;

   

      this.StrCrl.get("pedidos").then(data => {
            let aEnviar2 = {
              vendedorId: this.vendedorId,
              fecha: new Date().toISOString().slice(0, 10),
              pedidos: data
            }

        this.http.post(direccionPedidos, aEnviar2)
          .subscribe(datosRespuesta => {
            console.log(datosRespuesta)
          }); 

            
      });


    });
 
  }

}
