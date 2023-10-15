import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {
  formData: any = {
    username : "",
    email :"",
    password : ""
  };

  constructor(private http : HttpClient, private router : Router) {

  }

  onSubmit() {
    this.http.post('https://projecthub-backend-xll0.onrender.com/register',this.formData).subscribe((res)=>{
      console.log(res);
      alert("Successfully Register !!")

      this.router.navigate(["/login"])
      
    },(error)=>{
      console.log(error);
      alert("User Already Exist !")
    })
  }

}
