
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SocketService } from './service/socket.service';
import {NodeDataService} from './service/node-data.service';
import {PersonalDataService} from './service/personal-data.service';
import { AuthService} from  './auth/auth.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './portfolio/login/login.component';
import { ProfileComponent } from './portfolio/profile/profile.component';
import { AboutComponent } from './portfolio/about/about.component';
import { SkillsComponent } from './portfolio/skills/skills.component';
import { ResumeComponent } from './portfolio/resume/resume.component';
import { ContactComponent } from './portfolio/contact/contact.component';
import { MainComponent } from './portfolio/main/main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AboutComponent,
    SkillsComponent,
    ResumeComponent,
    ContactComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule, 
  
  ],
  providers: [
    SocketService,
    NodeDataService,
    PersonalDataService,
    AuthService
    ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
