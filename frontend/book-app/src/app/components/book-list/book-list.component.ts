import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  private bookService = inject(BooksService);
  private router = inject(Router)
  // Using signals from service
  books = this.bookService.books;
  bookCount = this.bookService.bookCount; // Reactive book count

  constructor() {
    this.bookService.loadBooks(); // Fetch books on component creation
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
  }

  navigateToAddBook(): void {
    this.router.navigate(['/bookcreate']); // Navigate to the book creation page
  }
}
