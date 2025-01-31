import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { Book } from '../../../books/models/book';
import { BooksService } from '../../../books/services/books.service';
import { BookListService } from '../../services/book-list.service';
import { BooklistCreateComponent } from './booklist-create.component';

describe('BooklistCreateComponent', () => {
  let component: BooklistCreateComponent;
  let fixture: ComponentFixture<BooklistCreateComponent>;
  let mockBookService: jasmine.SpyObj<BooksService>;
  let mockBookListService: jasmine.SpyObj<BookListService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for services
    mockBookService = jasmine.createSpyObj('BooksService', ['loadBooks']);
    mockBookListService = jasmine.createSpyObj('BookListService', ['createBookList']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    Object.defineProperty(mockBookService, 'books', {
      get: () => signal<Book[]>([
        { id: 1, title: 'Dune', author: 'Frank Herbert', year: 1965 },
        { id: 2, title: '1984', author: 'George Orwell', year: 1949 }
      ])
    });


    await TestBed.configureTestingModule({
      imports: [BooklistCreateComponent, ReactiveFormsModule, FormsModule, CommonModule],
      providers: [
        MockProvider(BooksService, mockBookService),
        MockProvider(BookListService, mockBookListService),
        MockProvider(Router, mockRouter)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on component creation', () => {
    expect(mockBookService.loadBooks).toHaveBeenCalled();
  });

  it('should update selected books when checkboxes are clicked', () => {
    component.updateBookSelection(1, { target: { checked: true } } as unknown as Event);
    expect(component.selectedBookIds()).toContain(1);

    component.updateBookSelection(1, { target: { checked: false } } as unknown as Event);
    expect(component.selectedBookIds()).not.toContain(1);
  });

  it('should call createBookList with selected books and form name', () => {
    component.booklistForm.setValue({ name: 'Sci-Fi Favorites' });
    component.selectedBookIds.set([1, 2]);

    component.createBookList();

    expect(mockBookListService.createBookList).toHaveBeenCalledWith('Sci-Fi Favorites', [1, 2]);
    expect(component.successMessage()).toBe('Book List Created Successfully!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./booklists']);
  });

  it('should reset form and selected books after creation', () => {
    component.booklistForm.setValue({ name: 'Sci-Fi Favorites' });
    component.selectedBookIds.set([1, 2]);

    component.createBookList();

    expect(component.booklistForm.value).toEqual({ name: null });
    expect(component.selectedBookIds()).toEqual([]);
  });

  it('should disable submit button if form is invalid', () => {
    component.booklistForm.setValue({ name: '' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });
});
