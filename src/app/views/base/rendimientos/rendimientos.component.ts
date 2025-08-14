import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RendimientoORM } from '../../../@shared/models/interfaces';
import { RendimientoService } from '../../../@shared/services/general/rendimiento/rendimiento.service';

@Component({
  selector: 'app-navs',
  templateUrl: './rendimientos.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RendimientosComponent implements OnInit {

  rendimientos: RendimientoORM[] = [];
  rendimientoSeleccionado?: RendimientoORM[];

  nuevoRendimiento: RendimientoORM = {
    id_rendimiento: '',
    id_tipo_rendimiento: '',
    nombre_rendimiento: '',
    costoL: '',
    costoR: '',
    costoT: '',
    rendimiento: '',
  }

  ngOnInit(): void {
    this.cargarRendimientos();
  }

  constructor(private rendimientoService: RendimientoService) {}

  cargarRendimientos(): void {
    this.rendimientoService.getAllRendimiento().subscribe({
      next: (data) => {
        this.rendimientos = data.data; 
      },
      error: (err) => {
        console.error('Error cargando Rendimientos:', err);
      }
    });
  }

}
