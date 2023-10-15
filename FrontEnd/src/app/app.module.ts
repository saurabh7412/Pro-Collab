import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { ProjectCreateComponentComponent } from './project-create-component/project-create-component.component';
import { ProjectDetailComponentComponent } from './project-detail-component/project-detail-component.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateTaskComponent } from './create-task/create-task.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditTaskComponent } from './edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    DashboardComponentComponent,
    ProjectCreateComponentComponent,
    ProjectDetailComponentComponent,
    PageNotFoundComponentComponent,
    CreateTaskComponent,
    AddMemberComponent,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
