import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileCompetitionComponent } from './tile-competition.component';

describe('TileCompetitionComponent', () => {
  let component: TileCompetitionComponent;
  let fixture: ComponentFixture<TileCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileCompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
