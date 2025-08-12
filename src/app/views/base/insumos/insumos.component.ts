import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class InsumosComponent {
  insumos: { nombre: string; costo: number }[] = [];

  nuevoInsumo = {
    nombre: '',
    costo: null as number | null
  };

  constructor() {
    this.cargarInsumos();
  }

  cargarInsumos() {
    const data = localStorage.getItem('insumos');
    if (data) {
      this.insumos = JSON.parse(data);
    } else {
      // insumos "quemados"
      this.insumos = [
        { nombre: 'CAPUCHON TRANSPARENTE', costo: 0.05 },
        { nombre: 'CAPUCHON DECORADO', costo: 0.18 },
        { nombre: 'COMIDA FLORAL 5 GR', costo: 0.03 },
        { nombre: 'COMIDA FLORAL 10 GR', costo: 0.05 },
        { nombre: 'ETIQUETA UPC', costo: 0.01 },
        { nombre: 'LIGAS', costo: 0.02 },
        { nombre: 'ETIQUETA VARIEDAD', costo: 0.01 },
        { nombre: 'LAMINA CORRUGADA', costo: 0.1 },
        { nombre: 'LAMINA DE TELA', costo: 0.13 }
      ];
      this.guardarInsumos();
    }
  }

  guardarInsumos() {
    localStorage.setItem('insumos', JSON.stringify(this.insumos));
  }

  eliminarInsumo(index: number): void {
    const confirmar = confirm('¿Estás seguro de eliminar este insumo?');
    if (confirmar) {
      this.insumos.splice(index, 1);
      this.guardarInsumos();
    }
  }

  agregarInsumo() {
    if (this.nuevoInsumo.nombre && this.nuevoInsumo.costo !== null) {
      this.insumos.push({
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
      this.insumos[index].costo = costo;
      this.guardarInsumos();
    }
  }
}
