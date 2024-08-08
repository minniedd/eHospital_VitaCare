import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedicalWorkerNavBarComponent } from './medical-worker/medical-worker-nav-bar/medical-worker-nav-bar.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { MedicalWorkerAppointmentsComponent } from './medical-worker/medical-worker-appointments/medical-worker-appointments.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { MedicalWorkerScheduledAppointmentsComponent } from './medical-worker/medical-worker-scheduled-appointments/medical-worker-scheduled-appointments.component';
import { MedicalWorkerMakeAnAppointmentComponent } from './medical-worker/medical-worker-make-an-appointment/medical-worker-make-an-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicalWorkerReviewsComponent } from './medical-worker/medical-worker-reviews/medical-worker-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicalWorkerNavBarComponent,
    MedicalWorkerAppointmentsComponent,
    MedicalWorkerScheduledAppointmentsComponent,
    MedicalWorkerMakeAnAppointmentComponent,
    MedicalWorkerReviewsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', redirectTo: 'appointments-medical-worker', pathMatch: 'full'},
            {path: 'appointments-medical-worker', component: MedicalWorkerAppointmentsComponent},
            {path: 'appointments-scheduled-medical-worker', component: MedicalWorkerScheduledAppointmentsComponent},
            {path: 'make-appointment-medical-worker', component: MedicalWorkerMakeAnAppointmentComponent}
        ]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
