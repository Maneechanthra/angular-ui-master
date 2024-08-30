import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './column/column.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'board', component: BoardComponent },
  { path: 'column/:id', component: ColumnComponent },
];
