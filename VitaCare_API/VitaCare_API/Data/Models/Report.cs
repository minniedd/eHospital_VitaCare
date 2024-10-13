using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VitaCare_API.Data.Models
{
    public class Report
    {
        [Key]
        public int ReportID { get; set; }
        public int PatientID { get; set; }
        public int DoctorID { get; set; }
        public int AppointmentID {  get; set; }  
        public string Note { get; set; }
        public string? Prescription { get; set; } 

        // Navigation property
        [ForeignKey(nameof(PatientID))]
        public Patient Patient { get; set; }

        [ForeignKey(nameof(DoctorID))]
        public Doctor Doctor { get; set; }

        [ForeignKey(nameof(AppointmentID))]
        public Appointment Appointment { get; set; }

    }
}
