import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplementosORM } from '../../../@shared/models/interfaces';
import { ComplementosService } from '../../../@shared/services/general/complementos/complementos.service';


@Component({
  selector: 'app-complementos',
  templateUrl: './complementos.component.html',
  styleUrls: ['./complementos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ComplementosComponent implements OnInit {
  
  complementos: ComplementosORM[] = [];
  complementoSeleccionado?: ComplementosORM[];

  nuevoComplemento: ComplementosORM = {
    id_complemento: '',
    nombre_complemento: '',
    costo_complemento: '',
  }

  constructor(private complementoService: ComplementosService) {}

  ngOnInit(): void {
    this.cargarComplementos();
  }

  cargarComplementos(): void {
    this.complementoService.getAllComplementos().subscribe({
      next: (data) => {
        this.complementos = data.data; 
      },
      error: (err) => {
        console.error('Error cargando complementos:', err);
      }
    });
  }

}
