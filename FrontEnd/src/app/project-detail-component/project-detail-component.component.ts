import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail-component',
  templateUrl: './project-detail-component.component.html',
  styleUrls: ['./project-detail-component.component.css']
})
export class ProjectDetailComponentComponent implements OnInit {
  projectId : string = "";
  project : any ;
  allUsers : any ;



  constructor(private route: ActivatedRoute, private http : HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['projectId']; // Access the parameter 'id' here
      // console.log('Route parameter id:', id);

      this.projectId = id

      
    });

    this.getProject()

    
 
    }

    getProject(){
      
    const token = localStorage.getItem("token")

    if(token)
    {
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token, // Replace with your actual token
    });
    
      this.http.get(`https://projecthub-backend-xll0.onrender.com/projects/tasks/${this.projectId}`, {headers}).subscribe((res : any)=>{
        console.log(res.project);
        
        this.project = res.project
        // console.log(this.project.members);
      })

      this.http.get(`https://projecthub-backend-xll0.onrender.com/user`, { headers }).subscribe((res: any) => {
        console.log("Users ", res.allUsers);

        this.allUsers = res.allUsers
        // console.log(this.project.members);
      })

    
    }
    }


  deleteTask(id : any){
     
      // /task/:projectId/:taskId


    const token = localStorage.getItem("token")

    if(token)
    {
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token, // Replace with your actual token
    });

    console.log(id);
    
    
      this.http.delete(`https://projecthub-backend-xll0.onrender.com/task/${this.projectId}/${id}`, {headers}).subscribe((res : any)=>{

      alert('Task Deleted successfully !')
        this.getProject();
      })

    }
  }
    
    
  

}
