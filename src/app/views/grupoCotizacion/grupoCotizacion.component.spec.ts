import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';
import { GrupoCotizacionComponent } from './grupoCotizacion.component';

describe('GrupoCotizacionComponent ', () => {
  let component: GrupoCotizacionComponent ;
  let fixture: ComponentFixture<GrupoCotizacionComponent >;
  let iconSetService: IconSetService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [GridModule, CardModule, ChartjsModule, GrupoCotizacionComponent ],
    providers: [IconSetService]
}).compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(GrupoCotizacionComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
