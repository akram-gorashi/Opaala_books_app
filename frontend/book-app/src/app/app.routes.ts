import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BooklistManagementComponent } from './components/booklist-management/booklist-management.component';
import { BooklistDetailComponent } from './components/booklist-detail/booklist-detail.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'books', component: BookListComponent, title: 'Books' },
  { path: 'booklists', component: BooklistManagementComponent, title: 'Book Lists' },
  { path: 'booklists/:id', component: BooklistDetailComponent, title: 'Book List Details' },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback for unknown routes
];
