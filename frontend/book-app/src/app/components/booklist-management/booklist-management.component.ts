import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booklist-management',
  imports: [CommonModule],
  templateUrl: './booklist-management.component.html',
  styleUrl: './booklist-management.component.scss'
})
export class BooklistManagementComponent {
  private booksService = inject(BooksService);

  bookLists = this.booksService.bookLists;
  bookListCount = this.booksService.bookListCount;

  constructor() {
    this.booksService.loadBookLists();
  }

  deleteBookList(id: number): void {
    this.booksService.deleteBookList(id);
  }

}
