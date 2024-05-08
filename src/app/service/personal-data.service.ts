import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject,of} from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  private apiUrl = environment.apiBaseUrl;

  private defaultData = {
    "name": "Harish Kumar K",
    "email": "*****",
    "mobile": "*****",
    "website": "*****",
    "github": "https://github.com/",
    "linkedin": "https://in.linkedin.com/",
    "facebook":"https://www.facebook.com/",
    "instagram":"https://www.instagram.com/",
    "twitter":"https://twitter.com/",
    "location": "*****",
    "hometown": "*****",
    "projects": [
      {
        "title": "*****",
        "description": "*****",
        "link": "*****"
      }
    ]
  };

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found. Sending default data.');
      return of(this.defaultData);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/profile/data.json`, { headers }).pipe(
      tap(data => {
        localStorage.setItem('cachedData', JSON.stringify(data)); // Cache the fetched data
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        // If there's an error, return the cached data from localStorage if available
        const cachedData = localStorage.getItem('cachedData');
        if (cachedData) {
          console.log('Using cached data from localStorage.');
          return of(JSON.parse(cachedData));
        } else {
          console.log('No cached data found. Sending default data.');
          return of(this.defaultData); // Fallback to default data
        }
      })
    );
  }
}



// private dataSubject = new BehaviorSubject<any>(null);
//   constructor(private http:HttpClient) {
//   this.fetchDataOnce();
//    }
//    private fetchDataOnce(){
//    const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('No token found. Sending default data.');
//       this.dataSubject.next(this.defaultData); // Set default data
//       return;
//     }

//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     this.http.get(`${this.apiUrl}/profile/data.json`, { headers }).pipe(
//       tap(data => {
//         this.dataSubject.next(data); // Set the fetched data
//       }),
//       catchError(error => {
//         if (error.status === 403) {
//           console.log('Unauthorized access. Setting default data.');
//           this.dataSubject.next(this.defaultData); // Set default data on error
//         }
//         return of(null); // Continue with an empty observable
//       })
//     ).subscribe();
//    }

//    getData():Observable<any>{
//     return this.dataSubject.asObservable();
//    }

// }
