import { CommonModule } from '@angular/common';
import { signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { BookListService } from '../../services/book-list.service';
import { BooklistDetailComponent } from './booklist-detail.component';
import { BookList } from '../../models/book-list';

describe('BooklistDetailComponent', () => {
  let component: BooklistDetailComponent;
  let fixture: ComponentFixture<BooklistDetailComponent>;
  let mockBookListService: jasmine.SpyObj<BookListService>;
  let routeParamsSubject: BehaviorSubject<ParamMap>;

  beforeEach(async () => {
    //  Create spy for BookListService
    mockBookListService = jasmine.createSpyObj('BookListService', ['removeBookFromList'], ['bookLists']);

    //  Mock book lists using WritableSignal
    const mockBookLists = signal([
      {
        id: 1,
        name: 'Sci-Fi Classics',
        books: [{ id: 101, title: 'Dune', author: 'Frank Herbert', year: 1965 }]
      },
      {
        id: 2,
        name: 'Must Reads',
        books: [{ id: 102, title: '1984', author: 'George Orwell', year: 1949 }]
      }
    ]) as WritableSignal<BookList[]>;

    Object.defineProperty(mockBookListService, 'bookLists', { get: () => mockBookLists });

    //  Mock ActivatedRoute with a BehaviorSubject to simulate route changes
    routeParamsSubject = new BehaviorSubject(convertToParamMap({ id: '1' }));
    const mockActivatedRoute = { paramMap: routeParamsSubject.asObservable() };

    await TestBed.configureTestingModule({
      imports: [BooklistDetailComponent, CommonModule], //  Import standalone component
      providers: [
        MockProvider(BookListService, mockBookListService),
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the correct book list based on route ID', async () => {
    await fixture.whenStable(); //  Wait for Signals to update
    fixture.detectChanges();

    expect(component.bookList()?.id).toBe(1);
    expect(component.bookList()?.name).toBe('Sci-Fi Classics');
  });

  it('should update book list when route changes', async () => {
    routeParamsSubject.next(convertToParamMap({ id: '2' })); //  Simulate route change to ID 2
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.bookList()?.id).toBe(2);
    expect(component.bookList()?.name).toBe('Must Reads');
  });

  it('should call `removeBookFromList` when removing a book', () => {
    component.removeBook(101);
    fixture.detectChanges();

    expect(mockBookListService.removeBookFromList).toHaveBeenCalledWith(1, 101);
  });
});
