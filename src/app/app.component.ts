import { Component, OnInit, Renderer2 } from '@angular/core';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { SocketService } from './service/socket.service';
import {environment} from '../environments/environment';
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

  constructor(private auth:AuthService,
    private router:Router, 
    private renderer:Renderer2,
    private meta:Meta,
    private title:Title
    ) { }

  
  ngOnInit(): void {
this.title.setTitle('Harish Kumar K');
this.meta.updateTag({ name: 'og:title', content: 'Harish Kumar' });
this.meta.updateTag({
      name: 'og:description',
      content: 'Portfolio with Home Automation using Angular, Node.js, Arduino, RabbitMq',
    });
this.meta.updateTag({
      property: 'og:image',
      content: '../assets/profile_image.png', // Relative path to the image
    });
    this.meta.updateTag({
      name: 'og:url',
      content: 'https://harishkumark-portfolio.web.app',
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });
    // Twitter Card meta tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image', // Type of Twitter Card
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Harish Kumar K',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Portfolio with Home Automation using Angular, Node.js, Arduino, RabbitMQ',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: '/assets/profile_image.png', // Absolute path relative to the root
    });
    this.meta.updateTag({
      name: 'twitter:url',
      content: 'https://harishkumark-portfolio.web.app',
    });
    // firebase

const firebaseApp = initializeApp(environment.firebaseConfig);

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
