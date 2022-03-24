import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotfoundComponent } from './auth/notfound/notfound.component';
import { RegisterComponent } from './auth/register/register.component';
import { IsloggedGuard } from './guards/islogged.guard';
import { IsntloggedGuard } from './guards/isntlogged.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", canActivate: [IsntloggedGuard], component: HomeComponent},
  { path: "login", canActivate: [IsntloggedGuard], component: LoginComponent},
  { path: "register", canActivate: [IsntloggedGuard], component: RegisterComponent},
  { path: 'dashboard', canActivate: [IsloggedGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: "**", component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
