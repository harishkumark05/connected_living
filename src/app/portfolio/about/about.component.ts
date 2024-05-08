import { Component } from '@angular/core';
import {PersonalDataService} from './../../service/personal-data.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  data:any ={}
constructor(private dataService:PersonalDataService){}
ngOnInit(){
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing function
      offset: 120,    // Animation offset in pixels for when animations trigger
      once: false,    // Set to false to allow animations to occur every time they are scrolled into view
    });
  this.dataService.getData().subscribe({
      next: (data: any) => {
        this.data = data; // Assign the fetched data
      },
      error: (err) => {
        console.error("Error fetching data:", err);
        this.data = null; // Reset data if there's an error
      }
    });
}
}
