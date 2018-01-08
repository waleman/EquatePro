import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//paginas
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { SincronizarPage } from '../pages/sincronizar/sincronizar';

//paginas
import { GestionvisitasPage } from '../pages/gestionvisitas/gestionvisitas';
import { ClientesvisitadosPage } from '../pages/clientesvisitados/clientesvisitados';
import { ClientesnovisitadosPage } from '../pages/clientesnovisitados/clientesnovisitados';
import { ClientespospuestosPage } from '../pages/clientespospuestos/clientespospuestos';
import { MenuvisitasPage } from '../pages/menuvisitas/menuvisitas';
import { VisitaPage } from '../pages/visita/visita';
import { NuevopedidoPage } from '../pages/nuevopedido/nuevopedido';
import { ListapedidosPage } from '../pages/listapedidos/listapedidos';

//modals
import { ModalRazonesNofacturaPage } from '../pages/modal-razones-nofactura/modal-razones-nofactura';
import { ModalRazonesNovisitaPage } from '../pages/modal-razones-novisita/modal-razones-novisita';
import { ProductosPage } from '../pages/productos/productos';
import { ProfuctosFacturarPage } from '../pages/profuctos-facturar/profuctos-facturar';
//providers
import { ConexionProvider } from '../providers/conexion/conexion';
import { UtilidadesProvider } from '../providers/utilidades/utilidades';

//complementos
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,SincronizarPage,
    MenuvisitasPage,
    ClientesvisitadosPage,
    ClientesnovisitadosPage,
    ClientespospuestosPage,
    GestionvisitasPage,
    VisitaPage, ModalRazonesNofacturaPage, ModalRazonesNovisitaPage,
    NuevopedidoPage, ProductosPage, ProfuctosFacturarPage, ListapedidosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,SincronizarPage,
    MenuvisitasPage,
    ClientesvisitadosPage,
    ClientesnovisitadosPage,
    ClientespospuestosPage,
    GestionvisitasPage,
    VisitaPage, ModalRazonesNovisitaPage, ModalRazonesNofacturaPage,
    NuevopedidoPage, ProductosPage, ProfuctosFacturarPage, ListapedidosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConexionProvider,
    UtilidadesProvider,
    Geolocation, Network,
 

  ]
})
export class AppModule {}
