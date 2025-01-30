import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookList } from '../../models/books';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booklist-detail',
  imports: [CommonModule],
  templateUrl: './booklist-detail.component.html',
  styleUrl: './booklist-detail.component.scss'
})
export class BooklistDetailComponent {
  private apiService = inject(BooksService);
  private route = inject(ActivatedRoute);

  bookLists = this.apiService.bookLists; // Get all book lists
  bookListId = signal<number | null>(null); // Store selected ID

  // Computed property: Get the selected book list from the available lists
  bookList = computed<BookList | undefined>(() => {
    return this.bookLists().find((list) => list.id === this.bookListId());
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.bookListId.set(Number(params.get('id'))); // Update ID when route changes
    });
  }

  // Function to remove a book from the list
  removeBook(bookId: number): void {
    if (this.bookListId()) {
      this.apiService.removeBookFromList(this.bookListId()!, bookId);
    }
  }
}
