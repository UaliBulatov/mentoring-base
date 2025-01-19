import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderComponent } from './header/header.component';


export const routes: Routes = [
  {
    path: '', redirectTo: 'header', pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersListComponent,
    pathMatch: 'full'
  },
  {
    path: 'header',
    component: HeaderComponent
  }  
];


