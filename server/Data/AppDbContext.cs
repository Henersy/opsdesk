using Microsoft.EntityFrameworkCore;

namespace OpsDesk.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
}
