import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective, CardComponent, CardBodyComponent } from '@coreui/angular';

// Interfaces
import { 
  CajaORM,
  ColorORM,
  ComplementosORM,
  FlorORM,
  GrupoCotizacionORM,
  InsumoORM,
  RendimientoORM,
  RendimientoPersonaORM,
  TipoInsumoORM,
  TipoRendimientoORM
 } from '../../@shared/models/interfaces';

// Servicos
import { CajaService } from '../../@shared/services/general/caja/caja.service';
import { ColorService } from '../../@shared/services/general/color/color.service';
import { ComplementosService} from '../../@shared/services/general/complementos/complementos.service';
import { FlorService } from '../../@shared/services/general/flor/flor.service';
import { GrupoCotizacionService } from '../../@shared/services/general/grupoCotizacion/grupoCotizacion.service';
import { InsumoService} from '../../@shared/services/general/insumo/insumo.service';
import { RendimientoService } from '../../@shared/services/general/rendimiento/rendimiento.service';
import { RendimientoPersonaService } from '../../@shared/services/general/rendimientoPersona/rendimientoPersona.service';
import { TipoInsumoService } from '../../@shared/services/general/tipoInsumo/tipoInsumo.service';
import { TipoRendimientoService } from '../../@shared/services/general/tipoRendimiento/tipoRendimiento.service';



@Component({
  selector: 'app-cotizacion',
  standalone: true,
  templateUrl: './cotizacion.component.html',
  imports: [
    CommonModule,
    ButtonDirective,
    CardComponent,
    CardBodyComponent
  ]
})
export class CotizacionComponent {
  step = 1;

  

  nextStep() {
    if (this.step < 3) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  finish() {
    alert('Cotización finalizada ✅');
  }
}
