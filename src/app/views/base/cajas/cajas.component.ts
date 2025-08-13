import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CajaORM } from '../../../@shared/models/interfaces';
import { CajaService } from '../../../@shared/services/general/caja/caja.service';


@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Si CajaService es providedIn: root no necesitas importarlo aquí
})
export class CajasComponent implements OnInit {

  cajas: CajaORM[] = [];
  cajaSeleccionada?: CajaORM[];

  nuevaCaja: CajaORM = {
    id_caja: '',
    nombre: '',
    costo: 0,
    tallos: 0,
    volumen: '',
    peso: 0,
    descripcion: '',
  }

  constructor(private cajaService: CajaService) {}

  ngOnInit(): void {
    this.cargarCajas();
  }

  cargarCajas(): void {
    this.cajaService.getAllCajas().subscribe({
      next: (data) => {
        this.cajas = data.data; 
        console.log('Cajas', this.cajas);
      },
      error: (err) => {
        console.error('Error cargando cajas:', err);
      }
    });
  }

}
