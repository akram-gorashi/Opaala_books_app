import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal, WritableSignal } from '@angular/core';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockBookService: jasmine.SpyObj<BooksService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    //  Create spies for BooksService & Router
    mockBookService = jasmine.createSpyObj('BooksService', ['loadBooks', 'deleteBook'], ['books', 'bookCount']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    //  Mock books and bookCount using WritableSignal
    const mockBooks = signal([
      { id: 1, title: 'Dune', author: 'Frank Herbert', year: 1965 },
      { id: 2, title: '1984', author: 'George Orwell', year: 1949 }
    ]) as WritableSignal<unknown[]>;

    const mockBookCount = signal(mockBooks().length) as WritableSignal<number>;

    Object.defineProperty(mockBookService, 'books', { get: () => mockBooks });
    Object.defineProperty(mockBookService, 'bookCount', { get: () => mockBookCount });

    await TestBed.configureTestingModule({
      imports: [BookListComponent, HttpClientTestingModule], //  Import standalone component and HttpClientTestingModule
      providers: [
        MockProvider(BooksService, mockBookService),
        MockProvider(Router, mockRouter)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load books on initialization', () => {
    expect(mockBookService.loadBooks).toHaveBeenCalled();
  });

  it('should display the correct book count', () => {
    expect(component.bookCount()).toBe(2);
  });

  it('should navigate to add book page', () => {
    component.navigateToAddBook();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/bookcreate']);
  });

  it('should call deleteBook when deleting a book', () => {
    component.deleteBook(1);
    expect(mockBookService.deleteBook).toHaveBeenCalledWith(1);
  });
});
