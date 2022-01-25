import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo/demo.component';

import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthserviceService } from './Service/authservice.service';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'demo', component: DemoComponent },
{ path: 'welcome', component: WelcomeComponent  ,canActivate :[AuthserviceService]},
{ path: 'user', component: UserComponent  },
{ path: 'register', component: RegisterComponent },


{ path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
