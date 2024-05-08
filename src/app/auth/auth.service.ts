import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl =  environment.apiBaseUrl;
  constructor(private http:HttpClient, private router:Router) { }
  login(username:string, pin:string){
    return this.http.post(`${this.apiUrl}/login`,{username,pin})
  }
  getData(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/data`,{headers});
  }
  isAuth(){
    return !!localStorage.getItem('token')
  }
   logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }
}
