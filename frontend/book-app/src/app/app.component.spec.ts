import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, //  Import the standalone component
        MockComponent(NavbarComponent), //  Mock NavbarComponent
        MockComponent(FooterComponent), //  Mock FooterComponent
        RouterOutlet //  Ensure routing is available
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "book-app"', () => {
    expect(component.title).toBe('book-app');
  });

  it('should render NavbarComponent', () => {
    const navbarElement = fixture.nativeElement.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();
  });

  it('should render FooterComponent', () => {
    const footerElement = fixture.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });

  it('should contain a RouterOutlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});
