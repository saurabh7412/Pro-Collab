// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   tokenn : string | null = localStorage.getItem('token');
// }



// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   constructor(private router: Router) {}

//   // Implement your logic to check if the user is logged in
//   isLoggedIn(): boolean {
//     // You can implement your own logic to check if the user is logged in
//     // For example, you might have a service that checks if the token exists in local storage.
//     return localStorage.getItem('token') !== null;
//   }

//   // Implement your logout logic
//   logout(): void {
//     // Your logout logic here, clear the token from local storage
//     localStorage.removeItem('token');
//     // Redirect to the login page
//     this.router.navigate(['/login']);
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  username: any = null;

  constructor(private router: Router) {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  // Implement your logic to check if the user is logged in
  isLoggedIn(): any {
    
    return localStorage.getItem('token') !== null;
  }

  // Implement your logout logic
  logout(): void {
    // Your logout logic here, clear the token from local storage
    localStorage.clear();
    this.username = null;
    // Redirect to the login page
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
