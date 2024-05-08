import { Component, OnInit, Renderer2 } from '@angular/core';
import {Router} from '@angular/router';
import { SocketService } from './service/socket.service';
import { single, multi } from './data';
import {AuthService} from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarOpen = false;
  dropDown1 = false;
 isSmallDevice =false;
 resizeListener :any;
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  constructor(private auth:AuthService,private router:Router, private renderer:Renderer2) { }

  
  ngOnInit(): void {
    // this.socketService.on('broadcastEvent').subscribe((data: string) => {
    //   this.message = data;
    //   console.log('Received message:', this.message);
    // });
    this.updateDeviceSize();
  this.resizeListener  = this.renderer.listen('window','resize',()=>{
    this.updateDeviceSize(); 
  })
  }
updateDeviceSize() {
    // Use Renderer2 to access window.innerWidth
    this.isSmallDevice = window.innerWidth < 768;
  }
  // sendMessage(): void {
  //   const data = 'Hello from Angular!';
  //   this.socketService.emit('customEvent', data);
  // }  
  toggleDropdown1(){
this.dropDown1 = ! this.dropDown1
  }
  logout(){
    this.auth.logout()
  }
  profileView(){
    if (this.isSmallDevice) {
          this.router.navigate(['/main']); // Example for small devices
        } else {
          this.router.navigate(['/profile']); // Default for larger devices
        }
  }
  login(){
   this.router.navigate(['login']);
  }
  isAuth(){
   return this.auth.isAuth();
  }
  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }
}
