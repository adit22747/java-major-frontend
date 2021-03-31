import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedPasswordLoginComponent } from './changed-password-login.component';

describe('ChangedPasswordLoginComponent', () => {
  let component: ChangedPasswordLoginComponent;
  let fixture: ComponentFixture<ChangedPasswordLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangedPasswordLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedPasswordLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
