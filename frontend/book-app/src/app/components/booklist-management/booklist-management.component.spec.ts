import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistManagementComponent } from './booklist-management.component';

describe('BooklistManagementComponent', () => {
  let component: BooklistManagementComponent;
  let fixture: ComponentFixture<BooklistManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooklistManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
