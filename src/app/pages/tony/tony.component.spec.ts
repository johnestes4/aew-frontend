import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonyComponent } from './tony.component';

describe('TonyComponent', () => {
  let component: TonyComponent;
  let fixture: ComponentFixture<TonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
