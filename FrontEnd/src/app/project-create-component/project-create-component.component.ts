import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create-component',
  templateUrl: './project-create-component.component.html',
  styleUrls: ['./project-create-component.component.css']
})
export class ProjectCreateComponentComponent {
  newProject: any = {};

  constructor(private http : HttpClient, private router: Router) {}

  

  onSubmit() {
    const token = localStorage.getItem("token")

    if(token)
    {
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token, // Replace with your actual token
      });

      this.http.post('https://projecthub-backend-xll0.onrender.com/projects',this.newProject, {headers}).subscribe((res : any)=>{
        console.log(res);
        alert("Project Created Successfully !!")
        this.router.navigate(["/dashboard"])
      })
    }


  }
}
