import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { ProjectCreateComponentComponent } from './project-create-component/project-create-component.component';
import { ProjectDetailComponentComponent } from './project-detail-component/project-detail-component.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

// const routes: Routes = [];


const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: 'dashboard', component: DashboardComponentComponent },
  { path: 'projects/create', component: ProjectCreateComponentComponent },
  { path: 'projects/:projectId', component: ProjectDetailComponentComponent },
  { path: 'projects/:projectId/addTask', component: CreateTaskComponent },
  { path: 'projects/:projectId/addMember', component: AddMemberComponent },
  { path: 'projects/:projectId/addTask', component: CreateTaskComponent },
  { path: 'projects/:projectId/editTask/:taskId', component: EditTaskComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', component: PageNotFoundComponentComponent },

];







@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
