import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  newTask: any = {
    taskName: '',
    deadline: '',
    description: '',
    priority: 'low',
    status: 'todo',
    assignedTo: ''
  };

  
  projectId : string = "";
  project : any ;

  projectMembers: any[] = [
    // Replace with your project members data
    { username: 'Member1' },
    { username: 'Member2' },
    { username: 'Member3' }
  ];

  constructor(private route: ActivatedRoute, private http : HttpClient, private router : Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['projectId']; // Access the parameter 'id' here
      console.log('Route parameter id:', id);

      this.projectId = id

      
    });

    
    const token = localStorage.getItem("token")

    if(token)
    {
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token, // Replace with your actual token
    });
    
      this.http.get(`https://projecthub-backend-xll0.onrender.com/projects/tasks/${this.projectId}`, {headers}).subscribe((res : any)=>{
        // console.log(res.project);
        
        this.project = res.project
        this.projectMembers = this.project.members;
        // console.log(this.project.members);
      })}
      
      
    }

    
  onSubmit() {

    
    console.log('Form submitted with data:', this.newTask);

    const token = localStorage.getItem("token")

    if(token)
    {
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token, // Replace with your actual token
     });

     this.http.post(`https://projecthub-backend-xll0.onrender.com/task/${this.projectId}/${this.newTask.assignedTo}`,this.newTask,{headers}).subscribe((res : any)=>{
      console.log(res);

      alert("New Task Added Successfully !")

      this.router.navigate([`/projects/${this.projectId}`])
    
    })

    }




    
  }



}
