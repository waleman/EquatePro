import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


//contorladores
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-modal-razones-novisita',
  templateUrl: 'modal-razones-novisita.html',
})
export class ModalRazonesNovisitaPage {

  public ListaNoVisita: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage, public viewCtrl: ViewController) {
    this.OpcNoVisita()
  }

  ionViewDidLoad() {
    
  }



  //seleccionar las  opciones de no visita
  OpcNoVisita() {
    this.storageCrtl.ready().then(() => {
      this.storageCrtl.get("noVisita").then(data => {
        if (data) {
          this.ListaNoVisita = data;
        } else {
          //Mostrar
          // error  con los datos de no visita por que no fueron descargados en el login
        }
      });
    });
  }


  itemSelected(id, nombre) {
    let ar = {
      razonId: id,
      descripcion: nombre
    };


    this.viewCtrl.dismiss(ar);

  }


}
