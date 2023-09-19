import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('username')  username:ElementRef;
  @ViewChild('password')  password:ElementRef;

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  activateRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    this.activateRoute.queryParamMap.subscribe((quaries)=>{
      const logout= Boolean(quaries.get('logout'));

      if(logout){
        this.authService.logout();
        alert('You are now loggout. I Logged =' + this.authService.isLogged);
      }
    })
  }

  onSubmit(){
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user = this.authService.login(username,password);
    console.log(user);
    if(user === undefined){
      alert('Incorrect username or password');

    }

    else {
      alert("Welcome "+user.name);
      this.router.navigate(['\Courses']);
    }
  }
}
