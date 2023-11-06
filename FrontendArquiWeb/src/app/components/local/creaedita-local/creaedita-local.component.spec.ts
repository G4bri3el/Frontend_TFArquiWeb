import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeditaLocalComponent } from './creaedita-local.component';

describe('CreaeditaLocalComponent', () => {
  let component: CreaeditaLocalComponent;
  let fixture: ComponentFixture<CreaeditaLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaeditaLocalComponent]
    });
    fixture = TestBed.createComponent(CreaeditaLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
