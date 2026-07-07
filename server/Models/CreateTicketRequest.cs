using System.ComponentModel.DataAnnotations;

namespace OpsDesk.Server.Models;

public class CreateTicketRequest
{
    [Required]
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string AssignedTo { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
