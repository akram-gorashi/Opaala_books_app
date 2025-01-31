import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooklistManagementComponent } from './booklist-management.component';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { BookListService } from '../../services/book-list.service';
import {  signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('BooklistManagementComponent', () => {
  let component: BooklistManagementComponent;
  let fixture: ComponentFixture<BooklistManagementComponent>;
  let mockBookListService: jasmine.SpyObj<BookListService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    //  Create spies for BookListService & Router
    mockBookListService = jasmine.createSpyObj('BookListService', ['loadBookLists', 'deleteBookList'], ['bookLists', 'bookListCount']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    //  Mock book lists and count using WritableSignal
    const mockBookLists = signal([
      { id: 1, name: 'Sci-Fi Classics', books: [{ id: 101, title: 'Dune', author: 'Frank Herbert', year: 1965 }] },
      { id: 2, name: 'Must Reads', books: [{ id: 102, title: '1984', author: 'George Orwell', year: 1949 }] }
    ]) as WritableSignal<any[]>;

    const mockBookListCount = signal(mockBookLists().length) as WritableSignal<number>;

    Object.defineProperty(mockBookListService, 'bookLists', { get: () => mockBookLists });
    Object.defineProperty(mockBookListService, 'bookListCount', { get: () => mockBookListCount });

    await TestBed.configureTestingModule({
      imports: [BooklistManagementComponent, CommonModule], //  Import standalone component
      providers: [
        MockProvider(BookListService, mockBookListService),
        MockProvider(Router, mockRouter)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load book lists on initialization', () => {
    expect(mockBookListService.loadBookLists).toHaveBeenCalled();
  });

  it('should display the correct book list count', () => {
    expect(component.bookListCount()).toBe(2);
  });

  it('should navigate to add book lists page', () => {
    component.navigateToAddBookLists();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/booklistcreate']);
  });

  it('should navigate to book list details', () => {
    component.viewBookListDetails(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/booklists/1']);
  });

  it('should call deleteBookList when deleting a book list', () => {
    component.deleteBookList(1);
    expect(mockBookListService.deleteBookList).toHaveBeenCalledWith(1);
  });
});
