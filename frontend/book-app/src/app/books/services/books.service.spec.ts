import { TestBed } from '@angular/core/testing';
import { BooksService } from './books.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService, HttpClient]
    });

    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load books from API', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Dune', author: 'Frank Herbert', year: 1965 },
      { id: 2, title: "Ender's Game", author: 'Orson Scott Card', year: 1985 }
    ];

    service.loadBooks();
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/books/');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);

    expect(service.books().length).toBe(2);
    expect(service.books()[0].title).toBe('Dune');
  });

  it('should create a new book', () => {
    const newBook: Partial<Book> = { title: '1984', author: 'George Orwell', year: 1949 };
    const mockResponse = { id: 3, ...newBook };

    service.createBook(newBook);
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/books/');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(service.books().length).toBe(1);
    expect(service.books()[0].title).toBe('1984');
  });

  it('should delete a book', () => {
    service.books.set([
      { id: 1, title: 'Dune', author: 'Frank Herbert', year: 1965 },
      { id: 2, title: "Ender's Game", author: 'Orson Scott Card', year: 1985 }
    ]);

    service.deleteBook(1);
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/books/1/');
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(service.books().length).toBe(1);
    expect(service.books()[0].id).toBe(2);
  });
});
