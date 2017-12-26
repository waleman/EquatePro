import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

//paginas
import { MenuvisitasPage } from '../menuvisitas/menuvisitas'
//controladores
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-clientespospuestos',
  templateUrl: 'clientespospuestos.html',
})
export class ClientespospuestosPage {
 public visitados=[];
  public lista:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storageCrtl:Storage,public menuCtrl: MenuController,public toastCtrl:ToastController) {
    this.VerlistadeClientes();
  }

  ionViewDidLoad() {
    
  }

  showMenu(){
    this.menuCtrl.open();
  }


  Salir(){
    this.navCtrl.push(MenuvisitasPage);
  }


  VerlistadeClientes(){
    this.storageCrtl.ready().then(()=>{
      this.storageCrtl.get("visitas").then(data=>{
        if(data){
                  this.lista = data;
                  let visitados = [];

                  for(let items of this.lista){
                    if (items['estado']=='Revisita'){
                        visitados.push(items);
                    }

                  }
                    this.visitados = visitados;
                }else{
                  let error = "Error! no hay clientes descargados ";
                  this.MostarToast(error);
                }
      });
    });  
  }


  MostarToast(MensajeError:any){
    let toast = this.toastCtrl.create({
      message: MensajeError,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "x"
    });
    toast.present();
   }

}
