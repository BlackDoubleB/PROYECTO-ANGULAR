import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MyReservationComponent } from './view/my-reservation/my-reservation.component';
import { CreateReservationComponent } from './view/create-reservation/create-reservation.component';
import { LayoutComponent } from './view/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateAccountComponent } from './view/create-account/create-account.component';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'crear-cuenta',
    component: CreateAccountComponent,
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      {
        path: '',
        redirectTo: 'create-reservation',
        pathMatch: 'full',
      },
      {
        path: 'header',
        component: HeaderComponent,
      },
      {
        path: 'sidebar',
        component: SidebarComponent,
      },
      {
        path: 'create-reservation',
        component: CreateReservationComponent,
      },
      {
        path: 'my-reservation',
        component: MyReservationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
