import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booklist-management',
  imports: [CommonModule],
  templateUrl: './booklist-management.component.html',
  styleUrl: './booklist-management.component.scss'
})
export class BooklistManagementComponent {
  private booksService = inject(BooksService);
  private router = inject(Router)
  bookLists = this.booksService.bookLists;
  bookListCount = this.booksService.bookListCount;

  constructor() {
    this.booksService.loadBookLists();
  }

  deleteBookList(id: number): void {
    this.booksService.deleteBookList(id);
  }

  navigateToAddBookLists(): void {
    this.router.navigate(['/booklistcreate']); // Navigate to the book creation page
  }

  viewBookListDetails(id: number): void {
    this.router.navigate([`/booklists/${id}`]); // Navigate to book list details
  }
}
