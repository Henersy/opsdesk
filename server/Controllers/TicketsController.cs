using Microsoft.AspNetCore.Mvc;
using OpsDesk.Server.Models;

namespace OpsDesk.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private static readonly List<Ticket> Tickets =
    [
        new()
        {
            Id = "TCK-1001",
            Title = "Zebra scanner not connecting",
            Category = "Scanner",
            Priority = "High",
            Status = "Open",
            Location = "Shipping",
            AssignedTo = "Unassigned",
        },
        new()
        {
            Id = "TCK-1002",
            Title = "Label printer offline",
            Category = "Printer",
            Priority = "Critical",
            Status = "In Progress",
            Location = "Dock 12",
            AssignedTo = "Henri Ortiz",
        },
        new()
        {
            Id = "TCK-1003",
            Title = "WMS login failed",
            Category = "WMS",
            Priority = "Medium",
            Status = "Open",
            Location = "Receiving",
            AssignedTo = "IT Support",
        },
    ];

    private static readonly object TicketsLock = new();

    [HttpGet]
    public ActionResult<IEnumerable<Ticket>> GetTickets()
    {
        return Ok(Tickets);
    }

    [HttpPost]
    public ActionResult<Ticket> CreateTicket(CreateTicketRequest request)
    {
        lock (TicketsLock)
        {
            var nextNumber = Tickets
                .Select(t => int.TryParse(t.Id.Replace("TCK-", ""), out var n) ? n : 1000)
                .DefaultIfEmpty(1000)
                .Max() + 1;

            var ticket = new Ticket
            {
                Id = $"TCK-{nextNumber}",
                Title = request.Title,
                Category = request.Category,
                Priority = request.Priority,
                Location = request.Location,
                AssignedTo = request.AssignedTo,
                Description = request.Description,
                Status = "Open",
            };

            Tickets.Add(ticket);
            return CreatedAtAction(nameof(GetTickets), null, ticket);
        }
    }
}
