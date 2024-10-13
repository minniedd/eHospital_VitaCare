namespace VitaCare_API.Endpoints.Doctor.Report
{
    public class AddReportRequest
    {
        public int PatientID { get; set; }
        public int DoctorID { get; set; }
        public int AppointmentID { get; set; }
        public string Note { get; set; }
        public string? Prescription { get; set; }
    }
}
