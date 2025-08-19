import { Component } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { GrupoCotizacionORM } from 'src/app/@shared/models/interfaces';
import { GrupoCotizacionService } from '../../@shared/services/general/grupoCotizacion/grupoCotizacion.service';

@Component({
  selector: 'app-grupoCotizacion',
  templateUrl: './grupoCotizacion.component.html',
  // imports: [RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
})
export class GrupoCotizacionComponent {


}
