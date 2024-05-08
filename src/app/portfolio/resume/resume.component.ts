import { Component } from '@angular/core';
import {PersonalDataService} from './../../service/personal-data.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  data:any ={}
constructor(private dataService:PersonalDataService){}
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
}
}
