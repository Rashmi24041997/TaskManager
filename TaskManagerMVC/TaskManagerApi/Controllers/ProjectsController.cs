using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MvcTaskManager.Models;

namespace TaskManagerApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ProjectsController : Controller
    {
        private readonly TaskManagerDbContext db;

        public ProjectsController(TaskManagerDbContext dbContext)
        {
            this.db = dbContext;
        }

        [HttpGet]
        public List<Project> Get()
        {
            List<Project> projects = db.Projects.ToList();
            return projects;
        }

        [HttpPost]
        public Project[] Post([FromBody] Project[] projects)
        {
            db.Projects.AddRange(projects);
            db.SaveChanges();
            return projects;
        }
        [HttpPut]
        public Project Put([FromBody] Project project)
        {
            Project existingProject = db.Projects.Where(temp => temp.ProjectID == project.ProjectID).FirstOrDefault();
            if (existingProject != null)
            {
                existingProject.ProjectName = project.ProjectName;
                existingProject.DateOfStart = project.DateOfStart;
                existingProject.TeamSize = project.TeamSize;
                db.SaveChanges();
                return existingProject;
            }
            else
            {
                return null;
            }
        }
        [HttpDelete]
        public int Delete(int ProjectID)
        {
            Project existingProject = db.Projects.Where(temp => temp.ProjectID == ProjectID).FirstOrDefault();
            if (existingProject != null)
            {
                db.Projects.Remove(existingProject);
                db.SaveChanges();
                return ProjectID;
            }
            else
            {
                return -1;
            }
        }
        [HttpGet]
        [Route("search/{searchby}/{searchtext}")]
        public List<Project> Search(string searchBy, string searchText)
        {
            List<Project> projects = null;
            if (searchBy == "ProjectID")
                projects = db.Projects.Where(temp => temp.ProjectID.ToString().Contains(searchText)).ToList();
            else if (searchBy == "ProjectName")
                projects = db.Projects.Where(temp => temp.ProjectName.Contains(searchText)).ToList();
            if (searchBy == "DateOfStart")
                projects = db.Projects.Where(temp => temp.DateOfStart.ToString().Contains(searchText)).ToList();
            if (searchBy == "TeamSize")
                projects = db.Projects.Where(temp => temp.TeamSize.ToString().Contains(searchText)).ToList();

            return projects;
        }

    }
}




