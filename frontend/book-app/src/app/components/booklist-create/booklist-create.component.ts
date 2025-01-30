import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booklist-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booklist-create.component.html',
  styleUrl: './booklist-create.component.scss'
})
export class BooklistCreateComponent {
  private bookService = inject(BooksService);
  private router = inject(Router)
  successMessage = signal('');
  books = this.bookService.books;
  selectedBookIds = signal<number[]>([]); // ✅ Signal to track selected books

  booklistForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor() {
    this.bookService.loadBooks(); // Fetch books on component creation
  }
  //  Method to handle book selection
  updateBookSelection(bookId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.selectedBookIds.update((prev) =>
      isChecked ? [...prev, bookId] : prev.filter((id) => id !== bookId)
    );
  }

  //  Create a new book list
  createBookList(): void {
    if (this.booklistForm.valid) {
      this.bookService.createBookList(
        this.booklistForm.get('name')?.value as string,
        this.selectedBookIds()
      );
      this.successMessage.set('Book List Created Successfully!');
      this.booklistForm.reset();
      this.selectedBookIds.set([]); // Reset selected books
      this.router.navigate(["./booklists"])
    }
  }
}