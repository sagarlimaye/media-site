import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user-detail/register/register.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user-detail/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewComponent } from './components/view/view.component'
import { AuthGuard } from 'src/app/auth/auth.guard';
import { from } from 'rxjs';
import { WeatherComponent } from './components/weather/weather.component';
import { AboutusComponent } from './components/aboutus/aboutus.component'

export const appRoutes: Routes =[
    {
        path: 'register', component: UserDetailComponent,
        children: [{ path: '', component:RegisterComponent}]
    },
    {
        path: 'login', component: UserDetailComponent,
        children: [{ path: '', component:LoginComponent}]
    },
    {
        path: 'user', component: UserComponent, canActivate: [AuthGuard]
        
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
        
    },
    {
        path: 'view', component: ViewComponent, canActivate: [AuthGuard]
        
    },
    {
        path: 'weather', component: WeatherComponent, canActivate: [AuthGuard]
        
    },
    {
        path: 'aboutus', component: AboutusComponent, canActivate: [AuthGuard]
        
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
    

]