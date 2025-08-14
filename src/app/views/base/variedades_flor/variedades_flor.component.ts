import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlorORM } from '../../../@shared/models/interfaces';
import { FlorService } from '../../../@shared/services/general/flor/flor.service';

@Component({
  selector: 'app-variedades_flor',
  templateUrl: './variedades_flor.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class VariedadesFlorComponent implements OnInit{
  
  flores: FlorORM[] = [];
  florSeleccionada?: FlorORM[];

  nuevaFlor: FlorORM = {
    id_flor: '',
    nombre: '',
    costoA:'',
    costoL:'',
    costoR:'',
  }

  constructor(private florService: FlorService) {}

  ngOnInit(): void {
    this.cargarFlores();
  }

  cargarFlores(): void {
    this.florService.getAllFlor().subscribe({
      next: (data) => {
        this.flores = data.data;
      },
      error: (err) => {
        console.error('Error cargando flores:', err);
      }
    });
  }



}
