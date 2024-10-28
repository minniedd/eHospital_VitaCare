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
import { MedicalWorkerReviewsComponent } from './medical-worker/medical-worker-reviews/clinic-reviews/medical-worker-reviews.component';
import { MedicalWorkerDoctorReviewsComponent } from './medical-worker/medical-worker-reviews/doctor-reviews/medical-worker-doctor-reviews.component';
import { DoctorScheduledAppointmentsComponent } from './Doctor/doctor-scheduled-appointments/doctor-scheduled-appointments.component';
import { DoctorNavBarComponent } from './Doctor/doctor-nav-bar/doctor-nav-bar.component';
import {FileEndpoint} from "./Doctor/doctor-scheduled-appointments/endpoints/file.endpoint";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    MedicalWorkerNavBarComponent,
    MedicalWorkerAppointmentsComponent,
    MedicalWorkerScheduledAppointmentsComponent,
    MedicalWorkerMakeAnAppointmentComponent,
    MedicalWorkerReviewsComponent,
    MedicalWorkerDoctorReviewsComponent,
    DoctorScheduledAppointmentsComponent,
    DoctorNavBarComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: '', redirectTo: 'appointments-medical-worker', pathMatch: 'full'},
            {path: 'appointments-medical-worker', component: MedicalWorkerAppointmentsComponent},
            {path: 'appointments-scheduled-medical-worker', component: MedicalWorkerScheduledAppointmentsComponent},
            {path: 'make-appointment-medical-worker', component: MedicalWorkerMakeAnAppointmentComponent},
            {path: 'clinic-review-medical-worker', component:MedicalWorkerReviewsComponent},
            {path: 'doctor-review-medical-worker',component:MedicalWorkerDoctorReviewsComponent},
            {path:'appointments-scheduled-doctor',component:DoctorScheduledAppointmentsComponent}
        ]),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule
    ],
  providers: [FileEndpoint],
  bootstrap: [AppComponent]
})
export class AppModule { }
