import { AfterViewInit, Component, computed, DOCUMENT, forwardRef, inject, input, OnInit, Renderer2 } from '@angular/core';

import { CardComponent, CardHeaderComponent, } from '@coreui/angular';

@Component({
  templateUrl: 'cotizacion.component.html',
  imports: [CardComponent, CardHeaderComponent ,]
})
export class CotizacionComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
  }
}

