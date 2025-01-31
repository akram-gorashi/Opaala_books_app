import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCreateComponent } from './book-create.component';
import { MockProvider } from 'ng-mocks';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let mockBookService: jasmine.SpyObj<BooksService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies for service and router
    mockBookService = jasmine.createSpyObj('BooksService', ['createBook']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [BookCreateComponent, ReactiveFormsModule], 
      providers: [
        MockProvider(BooksService, mockBookService),
        MockProvider(Router, mockRouter)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.bookForm.value).toEqual({ title: '', author: '', year: '' });
  });

  it('should display validation errors when form is invalid', () => {
    component.bookForm.setValue({ title: '', author: '', year: '' });
    fixture.detectChanges();

    expect(component.bookForm.invalid).toBeTrue();
  });

  it('should call createBook when form is valid and submitted', async () => {
    component.bookForm.setValue({ title: '1984', author: 'George Orwell', year: '1949' });
  
    component.createBook();
    fixture.detectChanges(); //  Trigger UI updates
    await fixture.whenStable(); //  Wait for async updates
  
    expect(component.successMessage()).toBe('Book Created Successfully!'); //  Now this will work
  });

  it('should reset form after successful book creation', () => {
    component.bookForm.setValue({ title: '1984', author: 'George Orwell', year: '1949' });
    component.createBook();

    expect(component.bookForm.value).toEqual({ title: null, author: null, year: null });
  });

  it('should disable submit button if form is invalid', () => {
    component.bookForm.setValue({ title: '', author: '', year: '' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });
});
