import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

//paginas
import { MenuvisitasPage } from '../menuvisitas/menuvisitas';
import { VisitaPage } from '../visita/visita';

//controladores
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-gestionvisitas',
  templateUrl: 'gestionvisitas.html',
})
export class GestionvisitasPage {

  public lista:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,public storageCrtl:Storage,public toastCtrl:ToastController) {
    this.VerlistadeClientes();
  }

  ionViewDidLoad() {
   
  }


  showMenu(){
    this.menuCtrl.open();
  }


  VerlistadeClientes(){
    this.storageCrtl.ready().then(()=>{
      this.storageCrtl.get("visitas").then(data=>{
        if(data){
                  this.lista = data; 
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


   Salir(){
    this.navCtrl.push(MenuvisitasPage);
  }


  Enviar(id,nombre,index){
    this.navCtrl.push(VisitaPage,{cid:id  ,cnombre :nombre,numero:index });
  }





}

