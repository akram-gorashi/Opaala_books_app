import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-create',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {
  private apiService = inject(BooksService);
  private router = inject(Router);
  successMessage = signal('');

  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required, Validators.min(1500), Validators.max(new Date().getFullYear())]),
  });

  createBook(): void {
    if (this.bookForm.valid) {
      this.apiService.createBook({
        title: this.bookForm.get('title')!.value as string,
        author: this.bookForm.get('author')!.value as string,
        year: Number(this.bookForm.get('year')!.value),
      });
      this.successMessage.set('Book Created Successfully!');
      this.bookForm.reset();
      this.router.navigate(['/books']);
    }
  }
}
