import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { NodeDataService} from '../../service/node-data.service'
import {PersonalDataService} from './../../service/personal-data.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // formData = {
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: ''
  // };
  formData:FormGroup;
  emailSentMsg :String = '';
    data:any ={}
constructor(private emailService:NodeDataService, private formBuilder:FormBuilder, private dataService:PersonalDataService){
  this.formData = this.formBuilder.group({
    name:['', Validators.required],
    email:['',[Validators.required, Validators.email]],
    subject:['',Validators.required],
    message:['', Validators.required]
  })
}
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
   // sendMessage() {
   //  const emailText ={
   //    name:this.formData.name,
   //    subject:this.formData.subject,
   //    email:this.formData.email,
   //    text:this.formData.message
   //  }
   //  this.emailService.sendEmail(emailText).subscribe(data =>{
   //    console.log('Email sent Successfully', data)
   //  },
   // error =>{
   //  console.log("Error sending email", error)
   // }
   //  )
   //  }

sendMessage() {
  console.log('not disabled')
this.emailService.sendEmail(this.formData.value).subscribe(data =>{
      console.log('Email sent Successfully', data)
      this.emailSentMsg = "Email sent successfully";
    },
   error =>{
    console.log("Error sending email", error)
    this.emailSentMsg = "sending Email failed"
   }
    )
  }
}
