import { TestBed } from '@angular/core/testing';

import { MapBuilderService } from './map-builder.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MapBuilderService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: MapBuilderService = TestBed.get(MapBuilderService);
    expect(service).toBeTruthy();
  });
});
