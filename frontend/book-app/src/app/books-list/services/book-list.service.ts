import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BookList } from '../models/book-list';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  http = inject(HttpClient);

  bookLists = signal<BookList[]>([]);

  // Computed properties
  bookListCount = computed(() => this.bookLists().length);

  // ====== API METHODS ======


  // Fetch all booklists and store in signal
  loadBookLists(): void {
    this.http.get<BookList[]>(`${this.baseUrl}/booklists/`).subscribe((data) => {
      this.bookLists.set(data);
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
  // Delete a booklist
  deleteBookList(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/booklists/${id}/`).subscribe(() => {
      this.bookLists.update((prevLists) => prevLists.filter((list) => list.id !== id));
    });
  }
}
