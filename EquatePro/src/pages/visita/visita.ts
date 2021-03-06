import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,AlertController,ViewController } from 'ionic-angular';

//paginas
import { GestionvisitasPage } from '../gestionvisitas/gestionvisitas';
import { NuevopedidoPage } from '../nuevopedido/nuevopedido';

//modal
import { ModalRazonesNofacturaPage } from '../modal-razones-nofactura/modal-razones-nofactura'
import { ModalRazonesNovisitaPage } from '../modal-razones-novisita/modal-razones-novisita'


//contorladores
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-visita',
  templateUrl: 'visita.html',
})
export class VisitaPage {

    public id:any;
    public nombre:any;
    public numero:any;
    public estado:any;


    public razon:any;
    public razonNombre: any;

    public nofactura:any;
 

    public Razonnofactura:any;
    public RazonnofacturaNombre: any;

    public nota:any;
    public Lat:any;
    public Long:any;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public storageCrtl: Storage, private geoCtrl: Geolocation, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController) {
     this.id =this.navParams.get('cid');
     this.nombre = this.navParams.get('cnombre');
     this.numero = this.navParams.get('numero');
    
 
     this.Coordenadas();

  }

  ionViewDidLoad() {
    
  }

  showMenu(){
    this.menuCtrl.open();
  }

 





  //cancelar y salir
  cancelar(){
    this.navCtrl.push(GestionvisitasPage);
  }

  facturar() {
    this.navCtrl.push(NuevopedidoPage,{clienteid:this.id,clientenombre:this.nombre});

  }



/*muestra los errores */
MostarToast(MensajeError:any){
  let toast = this.toastCtrl.create({
    message: MensajeError,
    duration: 3000,
    showCloseButton: true,
    closeButtonText: "x"
  });
  toast.present();
 }


  GuardarlosCambios(){
      if(!this.estado){
            let error = "Para continuar. Debe decirnos si visitara el cliente seleccionado";
            this.MostarToast(error);
      }else{
           if(this.estado == "si"){ //si visitara 

                  if(!this.nofactura){//si  no ah seleccionado  nada
                        let error = "Para continuar. Debe decirnos si  tomara pedido para este cliente";
                        this.MostarToast(error);
                  }else{
                      if(this.nofactura == "si"){ //si facturara
                          let fact = 1
                          this. igularcampos(fact);
                          

                      }else{ //no facturara
                           if(!this.Razonnofactura){
                            let error = "Para continuar. Seleccione el motivo  por el cual no tomara pedido";
                            this.MostarToast(error);
                           }else{
                            this. igularcampos()
                           }
                      }
                  }
           }else{//no visitara
              if(!this.razon){ // si no selecciono una opcion de no vita
                let error = "Para continuar. Seleccione el motivo por el cual no visitara a cliente";
                this.MostarToast(error);
              }else{
                this.igularcampos()
              }
           }
      }   
  }


  igularcampos(fact:any = 0){


    this.storageCrtl.ready().then(()=>{
      this.storageCrtl.get("visitas").then(data =>{
        data[this.numero -1 ]["longitud"] = this.Long;
        data[this.numero -1 ]["altitud"] = this.Lat;
         data[this.numero -1 ]["notas"] = this.nota;

            // visito al cliente?
            if(this.estado == "si"){
              data[this.numero -1 ]["estado"] = "Visitado";
                
                if(this.nofactura == "si"){ //Facturara?
                  data[this.numero -1 ]["facturo"] = "1";
                }else{ // no facturara
                  data[this.numero -1 ]["facturo"] = "0";
                  data[this.numero -1 ]["nofacturoId"] = this.Razonnofactura;//razon por la que no facturara
                }
            }else{ // no visito al cliente
                if(this.razon==4){
                  data[this.numero -1 ]["estado"] = "Revisita";
                  data[this.numero -1 ]["razonId"] = this.razon; //razon por la cual no visito
                }else{
                  data[this.numero -1 ]["estado"] = "No Visita";
                  data[this.numero -1 ]["razonId"] = this.razon; //razon por la cual no visito
                }
             
            }

            this.storageCrtl.set("visitas",data)

if(fact == 1){
  let alert = this.alertCtrl.create({
    title: "Correcto",
    subTitle: "Visita Guardada exitosamente",
    buttons: [{
      text: 'OK',
      role: 'OK',
      handler: () => {
        this.facturar()
      }
    }
    ]
  });
  alert.present();


}else{

  let alert = this.alertCtrl.create({
    title: "Correcto",
    subTitle: "Visita Guardada exitosamente",
    buttons: [{
      text: 'OK',
      role: 'OK',
      handler: () => {
        this.cancelar()
      }
    }
    ]
  });
  alert.present();

}


         
            
      });
});
  }


  Coordenadas(){
        //colocar las coordenadas
        this.geoCtrl.getCurrentPosition().then((resp) => {
          this.Lat = resp.coords.latitude;
          this.Long = resp.coords.longitude;
         }).catch((error) => {
           // Error  al conseguir de coordenadas
         });
  }




  Buscar_razon_no_factura(){

    let modal = this.modalCtrl.create(ModalRazonesNofacturaPage)


    modal.onDidDismiss(data => {
      this.Razonnofactura = data["razonId"];
      this.RazonnofacturaNombre = data["descripcion"];
    });
    modal.present();

  }

  Buscar_razon_no_visita() {
    let modal = this.modalCtrl.create(ModalRazonesNovisitaPage)

    modal.onDidDismiss(data => {
      this.razon = data["razonId"];
      this.razonNombre = data["descripcion"];
    });

    modal.present();
  }




}
