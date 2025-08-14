import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InsumoORM } from '../../../@shared/models/interfaces';
import { InsumoService } from '../../../@shared/services/general/insumo/insumo.service';
import { TipoInsumoORM } from '../../../@shared/models/interfaces';
import { TipoInsumoService} from '../../../@shared/services/general/tipoInsumo/tipoInsumo.service'


@Component({
  selector: 'app-insumos_us',
  templateUrl: './insumos_us.component.html',
  styleUrls: ['./insumos_us.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class InsumosUSComponent implements OnInit{
  
  insumos: InsumoORM[] = [];
  insumosUS: InsumoORM[] = [];
  insumoSeleccionado?: InsumoORM[];
  insumoSeleccionadoUS?: InsumoORM[];
  tipoInsumos: TipoInsumoORM[] = [];

  nuevoInsumo: InsumoORM = {
    id_insumo: '',
    id_tipo_insumo: 0,
    nombre: '',
    costo: '',
  }

  constructor(
    private isumoService: InsumoService,
    private tipoInsumoService: TipoInsumoService
  ) {}

  ngOnInit(): void {
    this.cargarInsumos();
    this.cargarTipoInsumos();
  }

  cargarInsumos(): void {
    this.isumoService.getAllInsumo().subscribe({
      next: (data) => {
        console.log('Datos', data);
        this.insumos = data.data.filter(i => i.id_tipo_insumo === 1);
        console.log('insumos', this.insumos);
        this.insumosUS = data.data.filter(i => i.id_tipo_insumo === 2);
      },
      error: (err) => {
        console.error('Error cargando Insumos:', err);
      }
    });
  }

  cargarTipoInsumos(): void {
    this.tipoInsumoService.getAllTipoInsumo().subscribe({
      next: (data) => {
        this.tipoInsumos = data.data;
      },
      error: (err) => {
        console.error('Error cargando Tipo Insumos:', err);
      }
    });
  }
}
