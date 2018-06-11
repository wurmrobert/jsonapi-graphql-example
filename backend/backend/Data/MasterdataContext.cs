using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data {
    public class MasterdataContext : DbContext {
        public MasterdataContext(DbContextOptions<MasterdataContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Device> Devices { get; set; }
    }
}