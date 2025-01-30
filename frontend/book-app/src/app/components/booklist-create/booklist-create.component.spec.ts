import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklistCreateComponent } from './booklist-create.component';

describe('BooklistCreateComponent', () => {
  let component: BooklistCreateComponent;
  let fixture: ComponentFixture<BooklistCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooklistCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooklistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
