import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  http = inject(HttpClient);
  // ====== SIGNALS ======
  books = signal<Book[]>([]);
  // Computed properties
  bookCount = computed(() => this.books().length);
  // ====== API METHODS ======

  // Fetch all books and store in signal
  loadBooks(): void {
    this.http.get<Book[]>(`${this.baseUrl}/books/`).subscribe((data) => {
      this.books.set(data);
    });
  }
  // Create a new book
  createBook(book: Partial<Book>): void {
    this.http.post<Book>(`${this.baseUrl}/books/`, book).subscribe((newBook) => {
      this.books.update((prevBooks) => [...prevBooks, newBook]);
    });
  }

  // Delete a book
  deleteBook(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/books/${id}/`).subscribe(() => {
      this.books.update((prevBooks) => prevBooks.filter((b) => b.id !== id));
    });
  }
}
