import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//controladores
import { Storage } from '@ionic/storage';
import { ModalController,ViewController } from 'ionic-angular';

//modals 
import { ProductosPage } from '../productos/productos';
import { ProfuctosFacturarPage } from '../profuctos-facturar/profuctos-facturar';

@IonicPage()
@Component({
  selector: 'page-nuevopedido',
  templateUrl: 'nuevopedido.html',
})
export class NuevopedidoPage {

  public id: any;
  public nombre: any;
  public listadocompras:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage, public viewCtrl: ViewController, public modalCtrl: ModalController) {

    this.id = this.navParams.get('clienteid');
    this.nombre = this.navParams.get('clientenombre');

  }

  ionViewDidLoad() {
    
  }

/* mostramos los dos modals */
  Buscar_producto() {
    let modal = this.modalCtrl.create(ProductosPage)
    modal.onDidDismiss(data => {

            let modal2 = this.modalCtrl.create(ProfuctosFacturarPage,{datos:data})

                  modal2.onDidDismiss(data2 => {
                    console.log(data2)
                  });
           modal2.present();
    });

    modal.present();
  }






  

}
