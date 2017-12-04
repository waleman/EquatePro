import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//pagina 
import { HomePage } from '../home/home';
//providers
import { ConexionProvider } from '../../providers/conexion/conexion';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public _conexion: ConexionProvider, public StrCrl: Storage, public http: Http) {
    this.DatosdeUsuario();
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


  SincronizarVisitas(){
    let direccion = this._conexion.Url + "visitas/" + this.vendedorId + "/sincronizar";
    
    this.StrCrl.ready().then(() => {
          this.StrCrl.get("visitas").then(data => {
                let aEnviar = {
                  vendedorId: this.vendedorId,
                  visitas: data
                }
                this.http.post(direccion, aEnviar)
                  .subscribe(datosRespuesta => {
                    console.log(datosRespuesta)
                   });

          });
    });
 
  }

}
