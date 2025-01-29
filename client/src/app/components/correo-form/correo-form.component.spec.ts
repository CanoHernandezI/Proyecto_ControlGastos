import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoFormComponent } from './correo-form.component';

describe('CorreoFormComponent', () => {
  let component: CorreoFormComponent;
  let fixture: ComponentFixture<CorreoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorreoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorreoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
