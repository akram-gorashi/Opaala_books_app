import { TestBed } from '@angular/core/testing';
import { BookListService } from './book-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookList } from '../models/book-list';

describe('BookListService', () => {
  let service: BookListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [BookListService]
    });

    service = TestBed.inject(BookListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load book lists from API', () => {
    const mockBookLists: BookList[] = [
      { id: 1, name: 'Sci-Fi Classics', books: [{ id: 101, title: 'Dune', author: 'Frank Herbert', year: 1965 }] },
      { id: 2, name: 'Must Reads', books: [{ id: 102, title: '1984', author: 'George Orwell', year: 1949 }] }
    ];

    service.loadBookLists();
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/booklists/');
    expect(req.request.method).toBe('GET');
    req.flush(mockBookLists);

    expect(service.bookLists().length).toBe(2);
    expect(service.bookLists()[0].name).toBe('Sci-Fi Classics');
  });

  it('should create a new book list', () => {
    const newList: BookList = { id: 3, name: 'Favorites', books: [] };

    service.createBookList(newList.name, []);
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/booklists/');
    expect(req.request.method).toBe('POST');
    req.flush(newList);

    expect(service.bookLists().length).toBe(1);
    expect(service.bookLists()[0].name).toBe('Favorites');
  });

  it('should remove a book from a book list', () => {
    service.bookLists.set([
      { id: 1, name: 'Sci-Fi Classics', books: [{ id: 101, title: 'Dune', author: 'Frank Herbert', year: 1965 }] }
    ]);

    service.removeBookFromList(1, 101);
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/booklists/1/remove/?book_ids=101');
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(service.bookLists()[0].books.length).toBe(0);
  });

  it('should delete a book list', () => {
    service.bookLists.set([
      { id: 1, name: 'Sci-Fi Classics', books: [] },
      { id: 2, name: 'Must Reads', books: [] }
    ]);

    service.deleteBookList(1);
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/booklists/1/');
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(service.bookLists().length).toBe(1);
    expect(service.bookLists()[0].id).toBe(2);
  });
});
