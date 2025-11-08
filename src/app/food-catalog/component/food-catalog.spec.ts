import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCatalog } from './food-catalog';

describe('FoodCatalog', () => {
  let component: FoodCatalog;
  let fixture: ComponentFixture<FoodCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodCatalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
