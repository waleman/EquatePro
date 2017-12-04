import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//paginas
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MenuvisitasPage } from '../pages/menuvisitas/menuvisitas';
import { SincronizarPage } from '../pages/sincronizar/sincronizar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
  @ViewChild('NAV') navegacion:Nav;
  public rootPage:any;
  public pages:Array<{titulo:string,component:any,icon:string}>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.rootPage = LoginPage;
    this.pages = [ 
      { titulo :'Menu Principal',component: HomePage , icon:'home'},
      { titulo :'Encuestas',component: HomePage , icon:'clipboard'},
      { titulo :'Mapeo de clientes',component: HomePage , icon:'map'},
      { titulo :'Visitas',component: MenuvisitasPage , icon:'walk'},
     // { titulo :'Lista de pedidos',component: PedidosPage , icon:'cart'},
      { titulo :'Sincronizar',component: SincronizarPage , icon:'cloud'},
      { titulo :'Salir ',component: LoginPage , icon:'power'},
    ]

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }



  gotopage(page){
    this.navegacion.setRoot(page);
  }
}

