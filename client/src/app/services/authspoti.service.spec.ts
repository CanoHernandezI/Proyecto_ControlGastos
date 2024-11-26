import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { AuthService } from './authspoti.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
=======
import { AuthspotiService } from './authspoti.service';

describe('AuthspotiService', () => {
  let service: AuthspotiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthspotiService);
>>>>>>> a015bae7fa6b2bb31b2603ae368cb951e37f9d60
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
