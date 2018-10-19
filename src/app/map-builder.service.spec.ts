import { TestBed } from '@angular/core/testing';

import { MapBuilderService } from './map-builder.service';

describe('MapBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapBuilderService = TestBed.get(MapBuilderService);
    expect(service).toBeTruthy();
  });
});
