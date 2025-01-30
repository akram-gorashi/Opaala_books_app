import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookListService } from '../../services/book-list.service';

@Component({
  selector: 'app-booklist-management',
  imports: [CommonModule],
  templateUrl: './booklist-management.component.html',
  styleUrl: './booklist-management.component.scss'
})
export class BooklistManagementComponent {
  private bookListService = inject(BookListService);
  private router = inject(Router)
  bookLists = this.bookListService.bookLists;
  bookListCount = this.bookListService.bookListCount;

  constructor() {
    this.bookListService.loadBookLists();
  }

  deleteBookList(id: number): void {
    this.bookListService.deleteBookList(id);
  }

  navigateToAddBookLists(): void {
    this.router.navigate(['/booklistcreate']); // Navigate to the book creation page
  }

  viewBookListDetails(id: number): void {
    this.router.navigate([`/booklists/${id}`]); // Navigate to book list details
  }
}
