import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { of } from 'rxjs';

TestBed.configureTestingModule({
  imports: [NavbarComponent],
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        paramMap: of(convertToParamMap({})) //  Mock ActivatedRoute correctly
      }
    }
  ]
});
