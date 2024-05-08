import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalPipe } from '../pipes/capital.pipe';



@NgModule({
  declarations: [CapitalPipe],
  imports: [
    CommonModule
  ],
  exports:[
       CapitalPipe
    ]
})
export class SharedModule { }
