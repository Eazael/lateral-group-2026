using backend.Database.Entity;
using Microsoft.EntityFrameworkCore;

namespace backend.Database.Context
{
    public class TaskContext : DbContext
    {

        private string DbPath { get; }

        public DbSet<ProgrammedTask> Tasks { get; set; }

        public TaskContext(IConfiguration configuration)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            var databaseName = configuration.GetSection("Database")["Name"];
            DbPath = Path.Join(path, "blogging.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
         => optionsBuilder.UseSqlite($"Data Source={DbPath}");

    }
}
