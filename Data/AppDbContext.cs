using Microsoft.EntityFrameworkCore;
using TopHundredTrades.Models;

namespace TopHundredTrades.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Trade> Trades { get; set; }

    }
}
