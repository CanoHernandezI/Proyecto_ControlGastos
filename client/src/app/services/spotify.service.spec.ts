import { TestBed } from '@angular/core/testing';

import { SpotifyService } from './spotify.service';

describe('SpotifyServiceTsService', () => {
  let service: SpotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
