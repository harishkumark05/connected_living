import { Component, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import Typed from 'typed.js';
import {PersonalDataService} from './../../service/personal-data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
data:any ={} 
ngOnInit(){
  
  this.dataService.getData().subscribe({
      next: (data: any) => {
        this.data = data; // Assign the fetched data
      },
      error: (err) => {
        console.error("Error fetching data:", err);
        this.data = null; // Reset data if there's an error
      }
    });
AOS.init();
}
constructor(private dataService:PersonalDataService){}

ngAfterViewInit(): void {
    // Initialize Typed.js
    new Typed('.typed', {
      strings: [ 'Developer'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true
    });
  }
}
