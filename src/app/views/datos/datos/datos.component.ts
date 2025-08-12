import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DatosComponent {
  porcentaje_precio: {}[] = [];

  margen_operativo: {}[] = [];

  variedades: {}[] = [];

  gastos_costos: {}[] = [];

  
}
