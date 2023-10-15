import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ApiResponse {
  token: string; // Define the structure based on your API response
  user: {
    username: string,
    _id : string
  }

}


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent {


  formData: any = {
    username : "",
    email :"",
    password : ""
  };

  constructor(private http : HttpClient, private router: Router) {

  }

  onSubmit() {
    this.http.post<ApiResponse>('https://projecthub-backend-xll0.onrender.com/login',this.formData).subscribe((res)=>{
      console.log(res);
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', res.user.username)
      localStorage.setItem('userId', res.user._id)


      alert("Successfully Logged In !!")
      // Navigate to the "Project List" route
      this.router.navigate(['/dashboard']);
      
    },(error)=>{
      console.log(error);
      alert('Wrong Credentials !!')
      
    })
  }

}
