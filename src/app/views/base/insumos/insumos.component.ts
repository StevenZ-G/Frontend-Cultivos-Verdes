import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InsumoORM } from '../../../@shared/models/interfaces';
import { InsumoService } from '../../../@shared/services/general/insumo/insumo.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class InsumosComponent implements OnInit {
  
  insumos: InsumoORM[] = [];
  insumoSeleccionado?: InsumoORM[];

  nuevoInsumo: InsumoORM = {
    id_insumo: '',
    id_tipo_insumo: '',
    nombre: '',
    costo: '',
  }

  constructor(private isumoService: InsumoService) {}

  ngOnInit(): void {
    this.cargarInsumos();
  }

  cargarInsumos(): void {
    this.isumoService.getAllInsumo().subscribe({
      next: (data) => {
        this.insumos = data.data; 
        console.log('Insumos', this.insumos);
      },
      error: (err) => {
        console.error('Error cargando Insumos:', err);
      }
    });
  }


}
