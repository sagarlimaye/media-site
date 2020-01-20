import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { SportsComponent } from './sports/sports.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  { path: 'register', component: RegisterComponent },
  {
    path: '', 
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', component: NewsComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'admin', component: AdminComponent },
          { path: 'sports', component: NewsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
