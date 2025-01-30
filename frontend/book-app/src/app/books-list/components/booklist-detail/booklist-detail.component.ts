import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookList } from '../../models/book-list';
import { BookListService } from '../../services/book-list.service';

@Component({
  selector: 'app-booklist-detail',
  imports: [CommonModule],
  templateUrl: './booklist-detail.component.html',
  styleUrl: './booklist-detail.component.scss'
})
export class BooklistDetailComponent {
  private bookListService = inject(BookListService);
  private route = inject(ActivatedRoute);

  bookLists = this.bookListService.bookLists; // Get all book lists
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
      this.bookListService.removeBookFromList(this.bookListId()!, bookId);
    }
  }
}
