import { Component, OnInit } from '@angular/core';
import {
  GetAllClinicReviewsEndpoint,
  GetAllClinicReviewsResponseClinic
} from "./endpoints/get-all-clinic-reviews.endpoint";

@Component({
  selector: 'app-medical-worker-reviews',
  templateUrl: './medical-worker-reviews.component.html',
  styleUrls: ['./medical-worker-reviews.component.css']
})
export class MedicalWorkerReviewsComponent implements OnInit {

  clientReviewPodaci:GetAllClinicReviewsResponseClinic[]=[];
  constructor(private clientGetAllReviewsEndpoint: GetAllClinicReviewsEndpoint) { }

  ngOnInit(): void {
    this.getClientReviews();
  }

  getClientReviews(): void {
    this.clientGetAllReviewsEndpoint.obradi().subscribe(
      response => {
        this.clientReviewPodaci = response.clinicReview;
      },
      error => {
        console.error('Error fetching client reviews', error);
      }
    );
  }

}
