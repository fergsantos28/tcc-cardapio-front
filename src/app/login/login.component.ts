import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(){
    this.authService.login(this.user, this.password).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/service-area']);
    })
  }
  

}
