import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorORM } from '../../../@shared/models/interfaces';
import { ColorService } from '../../../@shared/services/general/color/color.service';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ColorComponent implements OnInit {
  
  colores: ColorORM[] = [];
  colorSeleccionado?: ColorORM[];

  nuevoColor: ColorORM = {
    id_color: '',
    nombre: '',
    codigo: '',
  }

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.cargarColores();
  }

  cargarColores(): void {
    this.colorService.getAllColors().subscribe({
      next: (data) => {
        this.colores = data.data; 
      },
      error: (err) => {
        console.error('Error cargando color:', err);
      }
    });
  }

}