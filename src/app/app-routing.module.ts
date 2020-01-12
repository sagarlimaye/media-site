import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', 
    component: NewsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', 
        children: [
          { path: 'news', component: NewsComponent }
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
