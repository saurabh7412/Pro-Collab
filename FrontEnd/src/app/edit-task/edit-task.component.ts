import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId: string = "";
  projectId: string = "";
  task: any;
  allUsers: any;
  selectedUsername: string = '';

  newTask: any = {
    taskName: '',
    description: '',
    priority: 'low',
    status: 'todo',
    assignedTo: ''
  };

  projectMembers: any[] = [
    // Replace with your project members data
    { username: 'Member1' },
    { username: 'Member2' },
    { username: 'Member3' }
  ];



  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['taskId'];
      console.log('Route parameter id:', id);

      this.taskId = id
    });


    const token = localStorage.getItem("token")

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your actual token
      });

      this.http.get(`https://projecthub-backend-xll0.onrender.com/tasks/${this.taskId}`).subscribe((res: any) => {
        console.log(res.task);

        this.task = res.task;

        this.newTask.taskName = res.task.taskName;
        this.newTask.description = res.task.description;
        this.newTask.priority = res.task.priority;
        this.newTask.status = res.task.status;
        this.newTask.assignedTo = res.task.assignedTo;
      })
    }

  }

  updateTask() {
    // /projects/:projectId/editTask/:taskId



    this.route.params.subscribe(params => {
      const id = params['projectId'];
      console.log('Route parameter id:', id);

      this.projectId = id
    });

    const token = localStorage.getItem("token")

    if(token){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your actual token
      });
      
      this.http.patch(`https://projecthub-backend-xll0.onrender.com/projects/${this.projectId}/editTask/${this.taskId}`, this.newTask,{headers}).subscribe((res: any) => {
        console.log(res);
        alert("Task updated successfully !!")
        
        this.router.navigate([`/projects/${this.projectId}`])
      })

    }


  }

}
