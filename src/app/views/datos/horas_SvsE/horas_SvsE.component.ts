import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horas-SvsE',
  templateUrl: './horas_SvsE.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class HorasSvsEComponent {

  salarios_MDO: { nombre: string, salario: number }[] = [];
  fumigacion: { nombre: string, precio: number }[] = [];

  horas_E_mes = 173;  // Valor de Horas Efectivas al Mes :)

  constructor() {
    this.cargarSalariosMDO();
    this.calcularFumigacion();
  }

  cargarSalariosMDO() {
    const data = localStorage.getItem('salarios_MDO');
    if (data) {
      try {
        this.salarios_MDO = JSON.parse(data);
      } catch (e) {
        console.error('Error al parsear salarios_MDO desde localStorage:', e);
      }
    } else {
      console.warn('No se encontraron datos de salarios_MDO en localStorage');
    }
  }

  // Funcion para calcular EJEMPLO DE HORAS SUPLEMENTARIAS VS EXTRAORDINARIAS
  calcularFumigacion() {
    //localStorage.setItem('horas_E_mes', JSON.stringify(this.horas_E_mes));

    const salarioCobertura = this.salarios_MDO.find(s => s.nombre.toUpperCase().includes('SALARIO CON COBERTURA'));

    if (salarioCobertura && salarioCobertura.salario > 0) {
      const precioHora = salarioCobertura.salario / this.horas_E_mes;
      this.fumigacion = [
        { nombre: 'COSTO POR HORA ORDINARIA', precio: precioHora },
        { nombre: 'COSTO POR HORA SUPLEMENTARIA (50% ADICIONAL)', precio: precioHora * 1.5 },
        { nombre: 'COSTO POR HORA EXTRAORDINARIA (100% ADICIONAL)', precio: precioHora * 2 }
      ];
    } else {
      console.error('No se encontró un salario válido con cobertura en salarios_MDO');
      this.fumigacion = [];
    }
  }
}
