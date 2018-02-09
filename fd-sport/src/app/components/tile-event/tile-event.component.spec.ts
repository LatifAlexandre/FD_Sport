import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileEventComponent } from './tile-event.component';

describe('TileEventComponent', () => {
  let component: TileEventComponent;
  let fixture: ComponentFixture<TileEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
