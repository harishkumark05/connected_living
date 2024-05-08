import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './portfolio/profile/profile.component';
import {AuthGuard} from './auth/auth.guard';
import { LoginComponent } from './portfolio/login/login.component';
import { AboutComponent } from './portfolio/about/about.component';
import { SkillsComponent } from './portfolio/skills/skills.component';
import { ResumeComponent } from './portfolio/resume/resume.component';
import { ContactComponent } from './portfolio/contact/contact.component'
import { MainComponent } from './portfolio/main/main.component';



const routes: Routes = [
{path:'',component:LoginComponent},
{ path:'profile', component: ProfileComponent}, 
{path:'project',
 loadChildren :()=>import('./dashboard/dashboard.module').then(m => m.DashboardModule)
},
{path:'login', component:LoginComponent},
{path:'about', component:AboutComponent},
{path:'skill', component:SkillsComponent},
{path:'resume', component:ResumeComponent},
{path:'contact', component:ContactComponent},
{path:'main',component:MainComponent},
 { path: '**', redirectTo: '/login' },
  // { path:'profile', component: ProfileComponent, canActivate:[AuthGuard]}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
