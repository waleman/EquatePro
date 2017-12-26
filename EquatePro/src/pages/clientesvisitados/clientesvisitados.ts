import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

//paginas
import { MenuvisitasPage } from '../menuvisitas/menuvisitas'
//controladores
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-clientesvisitados',
  templateUrl: 'clientesvisitados.html',
})
export class ClientesvisitadosPage {

  public lista:any;
  public visitados =[];

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
                  let visitados =[];
                  for (let items of  data){
                    
                    if (items['estado'] == 'Visitado'){
                      visitados.push(items);
                    }
                  }
               this.visitados = visitados;

                }else{
                  let error = "Error! no hay clientes descargados. Precione el boton sincronizar ";
                  this.MostarToast(error);
                }
      });
    });  
  }

/*
  getItems(ev: any) {
    
     let val = ev.target.value;

      if (val && val.trim() != '') {       
          this.lista = this.lista.filter((item) => {
              let value = (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
              return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          
         })
     }else{
       this.VerlistadeClientes();
     } 
   }
*/

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
