import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  private bookService = inject(BooksService);

  // Using signals from service
  books = this.bookService.books;
  bookCount = this.bookService.bookCount; // Reactive book count

  constructor() {
    this.bookService.loadBooks(); // Fetch books on component creation
    console.log(this.books);
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
  }
}
