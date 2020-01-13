import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/user-detail/register/register.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { appRoutes } from './routes';
import { LoginComponent } from './components/user-detail/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ViewComponent } from './components/view/view.component';
import { WeatherComponent } from './components/weather/weather.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
// import { AuthInterceptor } from 'src/app/auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    UserDetailComponent,
    LoginComponent,
    UserProfileComponent,
    ViewComponent,
    WeatherComponent,
    AboutusComponent
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
