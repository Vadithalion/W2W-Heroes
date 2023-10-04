import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from 'src/app/services/heroes.service';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });

    heroesService = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should delete a hero by ID', () => {
    const heroId = 'dc-batman';
    const expectedResult = true;

    heroesService.deleteHeroById(heroId).subscribe((result) => {
      expect(result).toBe(expectedResult);
    });

    const request = httpTestingController.expectOne(`${heroesService.baseUrl}/heroes/${heroId}`);
    expect(request.request.method).toBe('DELETE');

    request.flush(null, { status: 200, statusText: 'OK' });
  });
});
