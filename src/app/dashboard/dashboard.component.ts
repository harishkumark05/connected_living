import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter} from 'rxjs/operators';
import { SocketService } from '../service/socket.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 data:any;
   isLoading:boolean = true;
   private socketSubscription :any;
   timeoutId: any;  // Holds the ID for the timeout
  constructor(private router:Router, private socketService: SocketService){
this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.subscribeToSocket();
    });
  }

  ngOnInit(){
    // // console.log(this.data)
    // this.NodeData.fetchData();
    // this.NodeData.apiDat$.subscribe((data) =>{
    //   this.data = data;
    //   this.isLoading = false;
    // })
             this.subscribeToSocket();
             this.startTimeout();

// console.log('Home component')
       
  }
subscribeToSocket(){
  this.socketSubscription = this.socketService
  .on('broadcastEvent')
  .subscribe((data: string) => {
      clearTimeout(this.timeoutId);  // Clear the timeout since data was received
      this.data = JSON.parse(data); 
            this.isLoading = false;
    });
}
 startTimeout() {
    this.timeoutId = setTimeout(() => {
      this.isLoading = false;  // No longer loading
      this.data = null;  // Reset data
    }, 10000);  // Timeout set to 5 seconds (adjust as needed)
  }
    getItemSubtitle(key:any):any{
      if(key === 'temperature'){
        return "Degree in C"
      }else if(key ==="smoke"){
        return "ppm"
      }else if (key ==="gas"){
        return "ppm"
      }else {
        return "Binary"
      }
    }
    getIconString(key:any):any{
      switch(key){
      case "temperature":
        return "fa fa-thermometer-three-quarters fa-2xl";
      case "smoke":
        return "fa fa-fire-extinguisher fa-2xl";
      case "gas":
        return "fa fa-fire fa-2xl";
      case "motion":
        return "fa fa-eye fa-2xl";
      default:
        return "";
      }
    }

    getBgColor(key:any,value:any){
      switch(key){
      case 'temperature':
        if(value <20){
          return "bg-info"
        }else if(value <=33){
           return "bg-warning"
         }else{
           return "bg-danger"
        }
      case 'smoke':
        if(value <65){
          return "bg-info"
        }else {
          return "bg-danger"
        }
      case 'gas':
        if(value < 70){
          return "bg-info"
        }else if (value <=350){
          return "bg-warning"
        }else{
          return "bg-danger"
        }
      case 'motion':
        if(value == 0){
          return "bg-info"
        }else{
          return "bg-danger"
        }
      default:
        return ""
      }
    }

    ngOnDestroy(){
      this.socketSubscription.unsubscribe();
      clearTimeout(this.timeoutId);  // Clear the timeout on component destruction
    }
}
