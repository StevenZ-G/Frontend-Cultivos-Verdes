import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-variedades_flor',
  templateUrl: './variedades_flor.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class VariedadesFlorComponent {
  
  variedades_flor: {producto: string; costoR: number; costoA: number; costoL: number}[] = [];

  nuevaVariedad_flor = {
    producto: '',
    costoR: null as number | null,
    costoA: null as number | null,
    costoL: null as number | null,
  };

  constructor() {
    this.cargarVariedades_flor();
  }

  cargarVariedades_flor() {
    const data = localStorage.getItem('variedades_flor');
    if (data) {
      this.variedades_flor = JSON.parse(data);
    } else {
      // insumos "quemados"	
      this.variedades_flor = [
        {producto: 'AGAPANTHUS', costoR: 0.3, costoA: 0.3, costoL: 0.2},
        {producto: 'ALSTROEMERIA', costoR: 0.18, costoA: 0.22, costoL: 0.045},
        {producto: 'AMMIMAJUS', costoR: 0.24, costoA: 0.24, costoL: 0.13},
        {producto: 'ANEMONA', costoR: 0.6, costoA: 0.6, costoL: 0.58},
        {producto: 'ANTHURIUM', costoR: 0.12, costoA: 0.14, costoL: 0.04},
        {producto: 'ASTER', costoR: 0.3, costoA: 0.3, costoL: 1},
        {producto: 'BIRDS OF PARADISE', costoR: 0.2, costoA: 0.2, costoL: 0.15},
        {producto: 'BLUPEURUM', costoR: 0.4, costoA: 0.4, costoL: 0.25},
        {producto: 'BREANTHUS', costoR: 0.15, costoA: 0.22, costoL: 0.07},
        {producto: 'CALLA', costoR: 0.09, costoA: 0.09, costoL: 0.18},
        {producto: 'BRILLANTINA', costoR: 0.35, costoA: 0.4, costoL: 0.18},
        {producto: 'CARNATION', costoR: 0.22, costoA: 0.26, costoL: 0.15},
        {producto: 'CHEFLERA', costoR: 0.15, costoA: 0.25, costoL: 0.2},
        {producto: 'CHRISANTEMO', costoR: 0.1, costoA: 0.1, costoL: 0.01},
        {producto: 'COCCULUS', costoR: 0.2, costoA: 0.28, costoL: 0.1},
        {producto: 'COMPLEMENT', costoR: 0.15, costoA: 0.15, costoL: 0.1},
        {producto: 'CORDELINE', costoR: 0.35, costoA: 0.35, costoL: 0.09},
        {producto: 'CRASPEDIA', costoR: 0.1, costoA: 0.12, costoL: 0.05},
        {producto: 'CROCOSMIA', costoR: 0.3, costoA: 0.45, costoL: 0},
        {producto: 'CROTUS', costoR: 0.4, costoA: 0.5, costoL: 0.05},
        {producto: 'CYPRUS', costoR: 0.7, costoA: 0.9, costoL: 0.1},
        {producto: 'DELPHINIUM B', costoR: 0.22, costoA: 0.22, costoL: 0.12},
        {producto: 'DELPHINIUM E', costoR: 0.18, costoA: 0.24, costoL: 0.18},
        {producto: 'DIANTHUS', costoR: 0.35, costoA: 0.4, costoL: 0.05},
        {producto: 'DUSTY MILLER', costoR: 0.4, costoA: 0.4, costoL: 0.15},
        {producto: 'ERYNGIUM', costoR: 0.15, costoA: 0.15, costoL: 0.1},
        {producto: 'ERYNGIUM DYED', costoR: 0.6, costoA: 0.9, costoL: 0.5},
        {producto: 'EUCALYPTUS', costoR:  0.15, costoA: 0.18, costoL: 0.12},
        {producto: 'GARDEN ROSE', costoR: 0.3, costoA: 0.3, costoL: 0.3},
        {producto: 'GERBERA', costoR: 0.3, costoA: 0.25, costoL: 0.07},
        {producto: 'GREEN WICKY', costoR: 0.65, costoA: 0.85, costoL: 0.65},
        {producto: 'GYPSOPHILA', costoR: 0.24, costoA: 0.28, costoL: 0.07},
        {producto: 'HELYCRISIUM', costoR: 0.28, costoA: 0.28, costoL: 0.15},
        {producto: 'HYDRANGEA', costoR: 0.1, costoA: 0.1, costoL: 0.05},
        {producto: 'HYPERICUM', costoR: 0.1, costoA: 0.12, costoL: 0.05},
        {producto: 'HYPERICUM DYED', costoR: 0.8, costoA: 0.8, costoL: 0.8},
        {producto: 'IVY', costoR: 0.5, costoA: 0.6, costoL: 0.4},
        {producto: 'IVY GREEN', costoR  : 0.17, costoA: 0.17, costoL: 0.17},
        {producto: 'KALANCHOE', costoR: 0.35, costoA: 0.35, costoL: 0.35},
        {producto: 'KALES', costoR: 0.18, costoA: 0.18, costoL: 0.15},
        {producto: 'LAVENDER', costoR: 0.5, costoA: 0.65, costoL: 0.25},
        {producto: 'LEATHER LEAF', costoR: 0.03, costoA: 0.02, costoL: 0.03},
        {producto: 'LEUCAENDRO', costoR: 0.65, costoA: 0.7, costoL: 0.3},
        {producto: 'LIATRIS', costoR: 0.25, costoA: 0.25, costoL: 0.05},
        {producto: 'LILLY ASIATIC', costoR: 0.65, costoA: 0.75, costoL: 0.3},
        {producto: 'LILLY GRASS', costoR: 0.25, costoA: 0.25, costoL: 0},
        {producto: 'LILLY ORIENTAL', costoR: 0.3, costoA: 0.3, costoL: 0.17},
        {producto: 'LIMONIUM', costoR: 0.1, costoA: 0.1, costoL: 0},
        {producto: 'LIMONIUM DYED', costoR: 0.22, costoA: 0.2, costoL: 0.1},
        {producto: 'LIRIOPE', costoR: 0.13, costoA: 0.18, costoL: 0.11},
        {producto: 'LISIANTHUS', costoR: 0.5, costoA: 0.6, costoL: 0.06},
        {producto: 'MINI CALLAS', costoR: 0.15, costoA: 0.15, costoL: 0},
        {producto: 'MINI CARNATION', costoR: 0.3, costoA: 0.3, costoL: 0},
        {producto: 'MOLUCELLA', costoR: 0.09, costoA: 0.09, costoL: 0},
        {producto: 'MONKEY TAIL', costoR: 0.3, costoA: 0.3, costoL: 0.1},
        {producto: 'MUMS', costoR: 0.25, costoA: 0.25, costoL: 0.25},
        {producto: 'MYRTLE', costoR: 0.16, costoA: 0.16, costoL: 0.16},
        {producto: 'ORNITHOGALUM', costoR: 0.25, costoA: 0.25, costoL: 0.12},
        {producto: 'PAGODA', costoR: 0.12, costoA: 0.12, costoL: 0.12},
        {producto: 'PHYTOSPORUM', costoR: 0.25, costoA: 0.25, costoL: 0.13},
        {producto: 'POMPON', costoR: 0.5, costoA: 0.5, costoL: 0.5},
        {producto: 'POTHYNIA', costoR: 0.35, costoA: 0.5, costoL: 0.08},
        {producto: 'PROTEA', costoR: 0.4, costoA: 0.7, costoL: 0.08},
        {producto: 'RANUNCULUS', costoR: 0.11, costoA: 0.12, costoL: 0.1},
        {producto: 'ROSE', costoR: 0.4, costoA: 0.6, costoL: 0.08},
        {producto: 'RUSCUS', costoR: 0.3, costoA: 0.4, costoL: 0.3},
        {producto: 'RUSCUS DYED', costoR: 0.25, costoA: 0.25, costoL: 0.1},
        {producto: 'SCABIOSA', costoR: 0.28, costoA: 0.3, costoL: 0.1},
        {producto: 'SINENSIS', costoR: 0.14, costoA: 0.14, costoL: 0.04},
        {producto: 'SNAPDRAGON', costoR: 0.17, costoA: 0.17, costoL: 0.15},
        {producto: 'SOLIDAGO', costoR: 0.15, costoA: 0.15, costoL: 0.1},
        {producto: 'SOLIDAGO DYED', costoR: 0.28, costoA: 0.4, costoL: 0.1},
        {producto: 'SPIGAS', costoR: 0.13, costoA: 0.15, costoL: 0.05},
        {producto: 'SPRAY ROSES', costoR: 0.17, costoA: 0.17, costoL: 0.07},
        {producto: 'STATICE ASST', costoR: 0.1, costoA: 0.12, costoL: 0.05},
        {producto: 'STATICE DYED', costoR: 0.36, costoA: 0.36, costoL: 0.1},
        {producto: 'STATICE PURPLE', costoR: 0.65, costoA: 1, costoL: 0.65},
        {producto: 'STOCK', costoR: 0.22, costoA: 0.28, costoL: 0.16},
        {producto: 'SUCCULENT', costoR: 0.25, costoA: 0.4, costoL: 0.08},
        {producto: 'SUNFLOWER', costoR: 0.18, costoA: 0.18, costoL: 0.18},
        {producto: 'TIP SANDERIANA', costoR: 0.13, costoA: 0.15, costoL: 0.13},
        {producto: 'TREEFERN', costoR: 0.28, costoA: 0.28, costoL: 0.2},
        {producto: 'VERONICA', costoR: 0, costoA: 0, costoL: 0}, // Placeholder for VERONICA

      ];
      this.guardarVariedadesFlor();
    }
  }

  guardarVariedadesFlor() {
    localStorage.setItem('variedades_flor', JSON.stringify(this.variedades_flor));
  }

  eliminarVariedadFlor(index: number): void {
    const confirmar = confirm('¿Estás seguro de eliminar esta variedad de flor?');
    if (confirmar) {
      this.variedades_flor.splice(index, 1);
      this.guardarVariedadesFlor();
    }
  }

  agregarVariedadFlor() {
    if (this.nuevaVariedad_flor.producto && this.nuevaVariedad_flor.costoR !== null && this.nuevaVariedad_flor.costoA !== null && this.nuevaVariedad_flor.costoL !== null) {
      this.variedades_flor.push({
        producto: this.nuevaVariedad_flor.producto,
        costoR: this.nuevaVariedad_flor.costoR ?? 0, // convierte null en 0
        costoA: this.nuevaVariedad_flor.costoA ?? 0,
        costoL: this.nuevaVariedad_flor.costoL ?? 0
      });
      this.guardarVariedadesFlor();
      this.nuevaVariedad_flor = { producto: '', costoR: null, costoA: null, costoL: null };
    }
  }

  actualizarCostos(index: number, nuevoCostoR: string, nuevoCostoA: string, nuevoCostoL: string) {
    const costoR = parseFloat(nuevoCostoR);
    const costoA = parseFloat(nuevoCostoA);
    const costoL = parseFloat(nuevoCostoL);
    
    if (!isNaN(costoR) && !isNaN(costoA) && !isNaN(costoL)) {
      this.variedades_flor[index].costoR = costoR;
      this.variedades_flor[index].costoA = costoA;
      this.variedades_flor[index].costoL = costoL;
      this.guardarVariedadesFlor();
    }

  }

}
