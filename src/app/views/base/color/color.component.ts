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
  providers: [ColorService] // Proveemos el servicio aquí
})
export class ColorComponent implements OnInit {
  
  ngOnInit(): void {
  }

}