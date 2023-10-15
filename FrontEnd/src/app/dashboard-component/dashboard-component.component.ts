import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {

  projects: any = [];
  projectId: string = "";
  tokenn : string | null = localStorage.getItem('token');
  username : any = localStorage.getItem("user");

  constructor(private http: HttpClient, private route: ActivatedRoute, private router : Router) { }

  fetchData() {

    const token = localStorage.getItem("token")

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your actual token
      });

      console.log("HEADER", headers);


      this.http.get('https://projecthub-backend-xll0.onrender.com/projects/me', { headers }).subscribe((res: any) => {
        console.log(res);

        this.projects = res.projects
      })
    }

  }

  ngOnInit(): void {
    this.fetchData()
  }


  deleteProject(id: any) {

    const token = localStorage.getItem("token")

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your actual token
      });
      this.http.delete(`https://projecthub-backend-xll0.onrender.com/projects/${id}`, {headers}).subscribe((res: any) => {
        
      alert("Project Deleted !")
      this.fetchData()

      })
    }
  }

  // logOut(){
  //   localStorage.clear();
  //   alert("Logged Out Successfully !!")
  //   this.router.navigate(["/login"])
  // }



}
