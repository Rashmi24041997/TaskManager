using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MvcTaskManager.Models
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProjectID { get; set; }
        public string ProjectName { get; set; }
        [DisplayFormat(DataFormatString = "d/M/yyyy")]
        public DateTime DateOfStart { get; set; }
        public int TeamSize { get; set; }
    }

    public class TaskManagerDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = TaskManager; Integrated Security = True; Connect Timeout = 30; Encrypt = True; Trust Server Certificate = True; Application Intent = ReadWrite; Multi Subnet Failover = False");
        }
    }
}


