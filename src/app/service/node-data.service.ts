import { Injectable } from '@angular/core';
import  { HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NodeDataService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<any>(
      `${this.apiUrl}/arduinoArr`)
  }

  sendEmail(data:any){
    return this.http.post<any>(`${this.apiUrl}/send-email`, data)
  }
}
