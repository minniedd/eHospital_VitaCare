using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VitaCare_API.Data.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        public string? ProfilePhoto { get; set; }
    }
}
