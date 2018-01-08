import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//paginas
import { HomePage } from '../home/home';
//controladores
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-listapedidos',
  templateUrl: 'listapedidos.html',
})
export class ListapedidosPage {

  public listaPedidos = [];
  public contador:any = 0;
  public total:any = "0.00";
  public keys:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageCrtl: Storage) {
    this.buscarPedidos()
  }

  ionViewDidLoad() {
   
  }

  IrMenu(){
       this.navCtrl.push(HomePage);
  }

  buscarPedidos(){
      this.storageCrtl.ready().then(()=>{
        this.storageCrtl.keys().then(data => {
          this.keys = data;
          if (this.keys.includes('pedidos')) {

                this.storageCrtl.get('pedidos').then(valores => {
                    if(valores == 'none'){

                    }else{
                      let contador = 0;
                      let total = 0 ;
                      let valor = 0 ;
                      for (let item of valores) {
                        contador = contador + 1;
                        valor = parseFloat( item['total']);
                      total = (total*1) + valor;
                        this.listaPedidos.push(item);
                      }
                      this.contador = contador;
                      this.total = this.formatNum(total);
                    } 
                })
          }
        });   
      });
  }
  


  formatNum(val) {
    val = Math.round(val * 100) / 100;
    val = ("" + val).indexOf(".") > -1 ? val + "00" : val + ".00";
    var dec = val.indexOf(".");
    return dec == val.length - 3 || dec == 0 ? val : val.substring(0, dec + 3);
  }

}
