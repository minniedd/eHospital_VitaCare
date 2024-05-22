import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedicalWorkerNavBarComponent } from './medical-worker/medical-worker-nav-bar/medical-worker-nav-bar.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { MedicalWorkerAppointmentsComponent } from './medical-worker/medical-worker-appointments/medical-worker-appointments.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { MedicalWorkerScheduledAppointmentsComponent } from './medical-worker/medical-worker-scheduled-appointments/medical-worker-scheduled-appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicalWorkerNavBarComponent,
    MedicalWorkerAppointmentsComponent,
    MedicalWorkerScheduledAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'appointments-medical-worker',pathMatch:'full'},
      {path:'appointments-medical-worker',component:MedicalWorkerAppointmentsComponent},
      {path: 'appointments-scheduled-medical-worker',component:MedicalWorkerScheduledAppointmentsComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
