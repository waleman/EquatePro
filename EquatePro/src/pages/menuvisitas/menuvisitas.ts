import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

//paginas
import { HomePage } from '../home/home';
import { ClientesvisitadosPage } from '../clientesvisitados/clientesvisitados';
import { ClientesnovisitadosPage } from '../clientesnovisitados/clientesnovisitados';
import { ClientespospuestosPage } from '../clientespospuestos/clientespospuestos';
import { GestionvisitasPage } from '../gestionvisitas/gestionvisitas';

@IonicPage()
@Component({
  selector: 'page-menuvisitas',
  templateUrl: 'menuvisitas.html',
})
export class MenuvisitasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
  }

  ionViewDidLoad() {

  }

  showMenu(){
    this.menuCtrl.open();
  }

  irGestion(){
    this.navCtrl.push(GestionvisitasPage)
  }

  irNoVisitas(){
    this.navCtrl.push(ClientesnovisitadosPage)
  }

  irVisitas(){
    this.navCtrl.push(ClientesvisitadosPage)
  }

  irPospuestas(){
    this.navCtrl.push(ClientespospuestosPage)
  }

  Regresar(){
      this.navCtrl.push(HomePage);
  }



}
