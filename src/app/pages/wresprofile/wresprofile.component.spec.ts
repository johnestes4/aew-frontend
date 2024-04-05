import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WresprofileComponent } from './wresprofile.component';

describe('WresprofileComponent', () => {
  let component: WresprofileComponent;
  let fixture: ComponentFixture<WresprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WresprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WresprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
