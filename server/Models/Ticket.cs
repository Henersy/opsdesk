namespace OpsDesk.Server.Models;

public class Ticket
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string AssignedTo { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
