import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insumos_us',
  templateUrl: './insumos_us.component.html',
  styleUrls: ['./insumos_us.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class InsumosUSComponent {
  insumos_us: { nombre: string; costo: number }[] = [];

  nuevoInsumo = {
    nombre: '',
    costo: null as number | null
  };

  constructor() {
    this.cargarInsumos();
  }

  cargarInsumos() {
    const data = localStorage.getItem('insumos_us');
    if (data) {
      this.insumos_us = JSON.parse(data);
    } else {
      // insumos "quemados"
      this.insumos_us = [
        { nombre: 'ARRIVE ALIVE', costo: 0.72 },
        { nombre: 'FOOD', costo: 0.06 },
        { nombre: 'LAMINA PET', costo: 0.11 },
        { nombre: 'CAPUCHON', costo: 0.29 },
        { nombre: 'UPC', costo: 0.01 },
        { nombre: 'TRANSPORCARE', costo: 0.03 },
        { nombre: 'ETHYLBLOC', costo: 0.03 },
      ];
      this.guardarInsumos();
    }
  }

  guardarInsumos() {
    localStorage.setItem('insumos_us', JSON.stringify(this.insumos_us));
  }

  eliminarInsumo(index: number): void {
    const confirmar = confirm('¿Estás seguro de eliminar este insumo?');
    if (confirmar) {
      this.insumos_us.splice(index, 1);
      this.guardarInsumos();
    }
  }

  agregarInsumo() {
    if (this.nuevoInsumo.nombre && this.nuevoInsumo.costo !== null) {
      this.insumos_us.push({
        nombre: this.nuevoInsumo.nombre,
        costo: this.nuevoInsumo.costo ?? 0  // convierte null en 0
      });
      this.guardarInsumos();
      this.nuevoInsumo = { nombre: '', costo: null };
    }
  }

  actualizarCosto(index: number, nuevoCosto: string) {
    const costo = parseFloat(nuevoCosto);
    if (!isNaN(costo)) {
      this.insumos_us[index].costo = costo;
      this.guardarInsumos();
    }
  }
}
