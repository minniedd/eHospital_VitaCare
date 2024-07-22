﻿namespace VitaCare_API.Endpoints.MedicalWorker.AppointmentsEndpoints.Search
{
    public class AppointmentSearchResponse
    {
        public List<AppointmentSearchResponseAppointment>Appointments { get; set; }
    }

    public class AppointmentSearchResponseAppointment
    {
        public int AppointmentID { get; set; }
        public string Patient { get; set; }
        public string Examination { get; set; }
        public string Doctor { get; set; }
        public string AppointmentDateTime { get; set; }
        public string? Notes { get; set; }
    }
}
