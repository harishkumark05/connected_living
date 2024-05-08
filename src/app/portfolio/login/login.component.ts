import { Component,Renderer2 } from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username!:string;
pin!:string;
 errorMessage = '';
 loading:boolean =false;
 isSmallDevice =false;
 resizeListener :any;
constructor(private auth: AuthService, private router:Router, private renderer:Renderer2){}
onSubmit(){
  this.loading =true;
  this.auth.login(this.username, this.pin).subscribe((data:any)=>{
    localStorage.setItem('token',data.token);
    this.loading = false;
    // this.router.navigate(['/profile']);
    if (this.isSmallDevice) {
          this.router.navigate(['/main']); // Example for small devices
        } else {
          this.router.navigate(['/profile']); // Default for larger devices
        }

  }, (error)=>{
    this.loading = false;
    console.log('Login Err', error)
    this.errorMessage = 'User Pin is invalid'
  })
}
ngOnInit(){
  this.updateDeviceSize();
  this.resizeListener  = this.renderer.listen('window','resize',()=>{
    this.updateDeviceSize(); 
  })
}
  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }
  updateDeviceSize() {
    // Use Renderer2 to access window.innerWidth
    this.isSmallDevice = window.innerWidth < 768;
  }
  extendedView(){
       if (this.isSmallDevice) {
          this.router.navigate(['/main']); // Example for small devices
        } else {
          this.router.navigate(['/profile']); // Default for larger devices
        }
  }
}
