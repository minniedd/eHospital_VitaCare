using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VitaCare_API.Data;
using VitaCare_API.Data.Models;
using VitaCare_API.Endpoints.MedicalWorker.AppointmentsEndpoints.Add;
using VitaCare_API.Helpers;

namespace VitaCare_API.Endpoints.Doctor.Report
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddReportController : MyBaseEndpoint<AddReportRequest, AddReportResponse>
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AddReportController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public override async Task<AddReportResponse> Obradi(AddReportRequest request)
        {
            var report = new Data.Models.Report
            {
                PatientID = request.PatientID,
                DoctorID = request.DoctorID,
                AppointmentID = request.AppointmentID,
                Note = request.Note,
                Prescription = request.Prescription
            };

            _applicationDbContext.Report.Add(report);
            await _applicationDbContext.SaveChangesAsync();

            return new AddReportResponse { ReportID = report.ReportID };
        }
    }
}
