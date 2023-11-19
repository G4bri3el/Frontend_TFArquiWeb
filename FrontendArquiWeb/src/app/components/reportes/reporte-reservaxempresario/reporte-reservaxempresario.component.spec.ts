import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteReservaxempresarioComponent } from './reporte-reservaxempresario.component';

describe('ReporteReservaxempresarioComponent', () => {
  let component: ReporteReservaxempresarioComponent;
  let fixture: ComponentFixture<ReporteReservaxempresarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteReservaxempresarioComponent]
    });
    fixture = TestBed.createComponent(ReporteReservaxempresarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
