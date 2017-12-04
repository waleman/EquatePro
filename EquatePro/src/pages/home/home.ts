import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { Http } from '@angular/http';
//paginas

import { LoginPage } from '../login/login';
import { SincronizarPage } from '../sincronizar/sincronizar';

import { MenuvisitasPage } from '../menuvisitas/menuvisitas';
//providers
import { UtilidadesProvider } from '../../providers/utilidades/utilidades';

//componentes
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public dia:any
  public cantidad:any;

  constructor(public navCtrl: NavController,public _utilidades:UtilidadesProvider,public menuCtrl: MenuController,public storageCrtl:Storage) {
   this.dia = this._utilidades.BuscarDIaActual();
    this.menuCtrl.swipeEnable(true);

  }



  irSincronizar(){
       this.navCtrl.push(SincronizarPage);
  }


  irMenuVisitas(){
    this.navCtrl.push(MenuvisitasPage);
  }

/*
  irPedidos(){
       this.navCtrl.push(PedidosPage);
  }
*/

  Salir(){
      this.navCtrl.push(LoginPage);
  }

  showMenu(){
    this.menuCtrl.open();
  }


  irPedidos(){
    
  }



}
