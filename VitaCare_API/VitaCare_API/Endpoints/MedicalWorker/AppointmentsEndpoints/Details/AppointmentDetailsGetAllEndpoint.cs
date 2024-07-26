using Microsoft.AspNetCore.Mvc;
using VitaCare_API.Data;

namespace VitaCare_API.Endpoints.MedicalWorker.AppointmentsEndpoints.Details
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentDetailsGetAllEndpoint : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AppointmentDetailsGetAllEndpoint(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetAppointmentDetailsByID(int id)
        {
            var appointment = _applicationDbContext.Appointment.FirstOrDefault(x=>x.AppointmentID == id);

            if(appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }
    }
}
