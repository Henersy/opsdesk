using Microsoft.EntityFrameworkCore;
using OpsDesk.Server.Models;

namespace OpsDesk.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Ticket> Tickets => Set<Ticket>();
}
