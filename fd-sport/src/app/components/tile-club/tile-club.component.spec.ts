import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileClubComponent } from './tile-club.component';

describe('TileClubComponent', () => {
  let component: TileClubComponent;
  let fixture: ComponentFixture<TileClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
