import { Routes } from '@angular/router';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BooklistCreateComponent } from './components/booklist-create/booklist-create.component';
import { BooklistDetailComponent } from './components/booklist-detail/booklist-detail.component';
import { BooklistManagementComponent } from './components/booklist-management/booklist-management.component';

export const appRoutes: Routes = [
  { path: '', component: BookListComponent, title: 'Home' },
  { path: 'books', component: BookListComponent, title: 'Books' },
  { path: 'booklists', component: BooklistManagementComponent, title: 'Book Lists' },
  { path: 'booklists/:id', component: BooklistDetailComponent, title: 'Book List Details' },
  { path: 'bookcreate', component: BookCreateComponent, title: 'Book create' },
  { path: 'booklistcreate', component: BooklistCreateComponent, title: 'Book list create' },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback for unknown routes
];
