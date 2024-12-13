import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private apiUrl = 'http://localhost:3000/';

  public isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  public login(nome_usuario: string, senha: string) {
    return this.http.post(this.apiUrl + 'login', { nome_usuario, senha });
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
