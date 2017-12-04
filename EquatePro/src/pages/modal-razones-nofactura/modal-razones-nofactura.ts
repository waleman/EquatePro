import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


//contorladores
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-modal-razones-nofactura',
  templateUrl: 'modal-razones-nofactura.html',
})
export class ModalRazonesNofacturaPage {

  public ListaNoFactura: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage, public viewCtrl: ViewController) {
    this.OptionNoFactura();
  }

  ionViewDidLoad() {
    
  }



  // seleccionar las opciones de no factura
  OptionNoFactura() {
    this.storageCrtl.ready().then(() => {
      this.storageCrtl.get("noFactura").then(data => {
        if (data) {
          this.ListaNoFactura = data;
        } else {
          //mostrar
          // error con los datos de no factura por que no fueron descargados en el login
        }
      });
    });
  }

  itemSelected(id,nombre){
      let ar ={
        razonId : id,
        descripcion : nombre
      };



    this.viewCtrl.dismiss(ar);

  }

}
