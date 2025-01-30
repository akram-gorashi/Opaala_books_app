import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Book, BookList } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  http = inject(HttpClient);

  // ====== SIGNALS ======
  books = signal<Book[]>([]);
  bookLists = signal<BookList[]>([]);

  // Computed properties
  bookCount = computed(() => this.books().length);
  bookListCount = computed(() => this.bookLists().length);

  // ====== API METHODS ======

  // Fetch all books and store in signal
  loadBooks(): void {
    this.http.get<Book[]>(`${this.baseUrl}/books/`).subscribe((data) => {
      this.books.set(data);
    });
  }

  // Fetch all booklists and store in signal
  loadBookLists(): void {
    this.http.get<BookList[]>(`${this.baseUrl}/booklists/`).subscribe((data) => {
      this.bookLists.set(data);
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
  
  // Remove a book from a book list
  removeBookFromList(bookListId: number, bookId: number): void {
    this.http
      .delete<void>(`${this.baseUrl}/booklists/${bookListId}/remove/?book_ids=${bookId}`)
      .subscribe(() => {
        // Update the book list in the UI after removing the book
        this.bookLists.update((prevLists) =>
          prevLists.map((list) =>
            list.id === bookListId
              ? { ...list, books: list.books.filter((book) => book.id !== bookId) }
              : list
          )
        );
      });
  }

  // Create a new booklist
  createBookList(name: string, bookIds: number[]): void {
    this.http
      .post<BookList>(`${this.baseUrl}/booklists/`, { name, book_ids: bookIds })
      .subscribe((newList) => {
        this.bookLists.update((prevLists) => [...prevLists, newList]);
      });
  }

  // Delete a booklist
  deleteBookList(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/booklists/${id}/`).subscribe(() => {
      this.bookLists.update((prevLists) => prevLists.filter((list) => list.id !== id));
    });
  }
}
