import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UtilidadesProvider {

  constructor(public http: Http) {
    
  }


  BuscarDIaActual(){
    /*Buscar el dia  Actual */

    var d = new Date();
    var weekday = new Array(7);
    weekday[0] =  "Domingo";
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miércoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[6] = "Sabado";
    
    var n = weekday[d.getDay()];


    return n
}

BuscarNumerodeDia(){
  

  var d = new Date();
  var weekday = new Array(7);
  weekday[0] =  "0";
  weekday[1] = "1";
  weekday[2] = "2";
  weekday[3] = "3";
  weekday[4] = "4";
  weekday[5] = "5";
  weekday[6] = "6";
  
  var n = weekday[d.getDay()];


  return n
}


}
