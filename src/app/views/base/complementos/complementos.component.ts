import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complementos',
  templateUrl: './complementos.component.html',
  styleUrls: ['./complementos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ComplementosComponent {
  complementos: { nombre: string; costo: number }[] = [];

  nuevoComplemento = {
    nombre: '',
    costo: null as number | null
  };

  constructor() {
    this.cargarComplementos();
  }

  cargarComplementos() {
    const data = localStorage.getItem('complementos');
    if (data) {
      this.complementos = JSON.parse(data);
    } else {
      // Complementos "quemados"
      this.complementos = [
        { nombre: 'N/D', costo: 0 },
        { nombre: 'Bombillo', costo: 0.25 },
        { nombre: 'Piña de pino', costo: 0.15 },
        { nombre: 'Pick', costo: 0.2 },
        { nombre: 'Espigas', costo: 0.15 },
        { nombre: 'Canela', costo: 0.25 },
        { nombre: 'Maderas', costo: 0.2 },
      ];
      this.guardarComplementos();
    }
  }

  guardarComplementos() {
    localStorage.setItem('complementos', JSON.stringify(this.complementos));
  }

  eliminarComplemento(index: number): void {
    const confirmar = confirm('¿Estás seguro de eliminar este Complemento?');
    if (confirmar) {
      this.complementos.splice(index, 1);
      this.guardarComplementos();
    }
  }

  agregarComplemento() {
    if (this.nuevoComplemento.nombre && this.nuevoComplemento.costo !== null) {
      this.complementos.push({
        nombre: this.nuevoComplemento.nombre,
        costo: this.nuevoComplemento.costo ?? 0  // convierte null en 0
      });
      this.guardarComplementos();
      this.nuevoComplemento = { nombre: '', costo: null };
    }
  }

  actualizarCosto(index: number, nuevoCosto: string) {
    const costo = parseFloat(nuevoCosto);
    if (!isNaN(costo)) {
      this.complementos[index].costo = costo;
      this.guardarComplementos();
    }
  }

}
