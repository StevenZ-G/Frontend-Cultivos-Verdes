import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navs',
  templateUrl: './rendimientos.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RendimientosComponent {

  rendimientos_ramos: {nombre: string; rendimiento: number; costoR: number; costoT: number; costoL: number}[] = [];
  rendimientos_cajas: {nombre: string; rendimiento: number; costoR: number; costoT: number; costoL: number}[] = [];
  salarios_MDO: { nombre: string, salario: number }[] = [];
  horas_E_mes = 173;  // Valor de Horas Efectivas al Mes :)
  costo_h_persona = 0; 

  constructor() {
    this.cargarSalariosMDO();
    this.calcularChP();
    this.cargarRendimientos_ramos();
    this.cargarRendimientos_cajas();
  }

  // calcular Costo por hora persona
  calcularChP(){
    const salarioCobertura = this.salarios_MDO.find(s => s.nombre.toUpperCase().includes('SALARIO CON COBERTURA')); //Costo por persona mes
    console.log('salario cobertura', salarioCobertura);
    if (salarioCobertura && salarioCobertura.salario > 0) {
      this.costo_h_persona = salarioCobertura.salario / this.horas_E_mes;
      console.log('costo_h_persona', this.costo_h_persona);
    }
  }

  cargarRendimientos_ramos() {
    const data = localStorage.getItem('rendimientos_ramos');
    if (data) {
      this.rendimientos_ramos = JSON.parse(data);
      console.log(this.rendimientos_ramos);
    } else {
      // Rendimientos "quemados"
      this.rendimientos_ramos = [
        (() => {
          const rendimiento = 36;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'Bouquets', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 16;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR;
          return { nombre: 'Arreglo', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 65;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR;
          return { nombre: 'Consumer bunch', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 100;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR;
          return { nombre: 'Ramo en Paquete', rendimiento, costoR, costoT, costoL };
        })(),

      ];

      localStorage.setItem('rendimientos_ramos', JSON.stringify(this.rendimientos_ramos));
    }
  }

  cargarRendimientos_cajas() {
    const data = localStorage.getItem('rendimientos_cajas');
    if (data) {
      this.rendimientos_cajas = JSON.parse(data);
    } else {
      // Rendimientos "quemados"

      this.rendimientos_cajas = [
        (() => {
          const rendimiento = 30;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'HB VALLEFLOR', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 40;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'QB VALLEFLOR', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 50;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'SB ECUABOUQUETS', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 50;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'SB BOUQUETO', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 15;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'SB THE BOUQS thin', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 15;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'SIN CAJA', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 15;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'SB THE BOUQS fat', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 40;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'QB URBAN STEMS', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 30;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'HB FRESCA', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 40;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'QB FRESCA', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 80;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'EB FRESCA', rendimiento, costoR, costoT, costoL };
        })(),
        (() => {
          const rendimiento = 100;
          const costoR = this.costo_h_persona / rendimiento;
          const costoT = costoR + (costoR * 0.2);
          const costoL = costoR; // puedes modificar esto según lógica real
          return { nombre: 'Armado de cajas', rendimiento, costoR, costoT, costoL };
        })(),
      ];

      localStorage.setItem('rendimientos_cajas', JSON.stringify(this.rendimientos_cajas));
    }
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

}
