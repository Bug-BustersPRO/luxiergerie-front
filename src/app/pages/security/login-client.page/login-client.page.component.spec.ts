import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClientPageComponent } from './login-client.page.component';

describe('LoginClientPageComponent', () => {
  let component: LoginClientPageComponent;
  let fixture: ComponentFixture<LoginClientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginClientPageComponent]
    });
    fixture = TestBed.createComponent(LoginClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
