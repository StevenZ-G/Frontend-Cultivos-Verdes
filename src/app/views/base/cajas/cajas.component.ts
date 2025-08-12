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
  ngOnInit(): void {
  }

}
