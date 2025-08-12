import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-costos_MDO',
  templateUrl: './costos_MDO.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CostosMDOComponent {

  costos: {nombre: string; porcentaje: number}[] = [];

  salarios: {nombre: string; salario: number}[] = [];

  constructor() {
    this.cargarCostos();
    this.cargarSalarios();
  }

  cargarCostos(){
    const data = localStorage.getItem('costos_MDO');
    if (data) {
      this.costos = JSON.parse(data);
    } else {
      // costos "quemados"
      this.costos = [
        {nombre: 'FONDO DE RESERVA', porcentaje: 8.33},
        {nombre: 'DECIMO TERCER SUELDO', porcentaje: 8.33},
        {nombre: 'DECIMO CUARTO SUELDO', porcentaje: 8.33},
        {nombre: 'VACACIONES', porcentaje: 4.17},
        {nombre: 'DESAHUCIO 25%', porcentaje: 2.08},
        {nombre: 'DESPIDO 100%', porcentaje: 8.33},
        {nombre: 'IESS', porcentaje: 11.15},
        {nombre: 'SALARIO ADICIONAL de COBERTURA', porcentaje: 8.33}
      ]
      this.guardarCostos();
    }
  }
  guardarCostos() {
    localStorage.setItem('costos_MDO', JSON.stringify(this.costos));
  }

  // sumar porcentaje de costos
  get totalPorcentaje(): number {
    console.log('Calculando total de porcentajes...');
    return this.costos.reduce((total, costo) => total + costo.porcentaje, 0);
  }

  cargarSalarios() {
    const data = localStorage.getItem('salarios_MDO');
    if (data) {
      this.salarios = JSON.parse(data);
    } else {
      // salarios "quemados"
      this.salarios = [
        {nombre: 'SALARIO SIN COBERTURA', salario: 461.62 * 1.5072},
        {nombre: 'SALARIO CON COBERTURA', salario: 461.62 * 1.6},
      ]
      this.guardarSalarios();
    }
  }

  guardarSalarios() {
    localStorage.setItem('salarios_MDO', JSON.stringify(this.salarios));
  }

}
