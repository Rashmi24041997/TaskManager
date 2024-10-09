import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { DashboardService } from '../dashboard.service';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [DashboardComponent, MyProfileComponent, AboutComponent, ProjectComponent],
  imports: [CommonModule],
  exports: [DashboardComponent, MyProfileComponent, AboutComponent, ProjectComponent]
})
export class AdminModule {}
