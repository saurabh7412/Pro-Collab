import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  projectId: string = "";
  project: any;
  allUsers: any;
  selectedUsername: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['projectId']; // Access the parameter 'id' here
      console.log('Route parameter id:', id);

      this.projectId = id


    });


    const token = localStorage.getItem("token")

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token, // Replace with your actual token
      });

      this.http.get(`https://projecthub-backend-xll0.onrender.com/user`, { headers }).subscribe((res: any) => {
        console.log("Users ", res.allUsers);

        this.allUsers = res.allUsers
        // console.log(this.project.members);
      })
    }


  }


  addMember() {
    if (this.selectedUsername) {
      //  console.log(this.selectedUsername);
      const token = localStorage.getItem("token")

      if (token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token, // Replace with your actual token
        });


        this.http.post(`https://projecthub-backend-xll0.onrender.com/projects/${this.projectId}/add/${this.selectedUsername}`,{}, { headers }).subscribe((res: any) => {
          console.log(res);

          alert("New Member Added Successfully !")

          this.router.navigate([`/projects/${this.projectId}`])

        })

      }





    }
  }





}
