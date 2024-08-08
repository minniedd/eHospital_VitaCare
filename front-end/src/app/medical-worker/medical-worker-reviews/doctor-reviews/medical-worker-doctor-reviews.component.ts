import { Component, OnInit } from '@angular/core';
import {
  GetAllDoctorReviewsEndpoint,
  GetAllDoctorReviewsResponseDoctor
} from "./endpoints/get-all-doctor-reviews.endpoint";

@Component({
  selector: 'app-medical-worker-doctor-reviews',
  templateUrl: './medical-worker-doctor-reviews.component.html',
  styleUrls: ['./medical-worker-doctor-reviews.component.css']
})
export class MedicalWorkerDoctorReviewsComponent implements OnInit {

  doctorReviewPodaci:GetAllDoctorReviewsResponseDoctor[]=[];
  constructor(private getAllDoctorReviewsEndpoint:GetAllDoctorReviewsEndpoint) { }

  ngOnInit(): void {
    this.getDoctorReviews();
  }

  getDoctorReviews(): void {
    this.getAllDoctorReviewsEndpoint.obradi().subscribe(
      response => {
        this.doctorReviewPodaci = response.doctorReview;
      },
      error => {
        console.error('Error fetching client reviews', error);
      }
    );
  }

}
