import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitaPage } from './visita';

@NgModule({
  declarations: [
    VisitaPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitaPage),
  ],
})
export class VisitaPageModule {}
