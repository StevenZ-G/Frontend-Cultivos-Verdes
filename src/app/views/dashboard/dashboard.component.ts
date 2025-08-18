import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from '@coreui/angular';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports: [CarouselComponent, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent, RouterLink]
})
export class DashboardComponent implements OnInit {
slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      src: 'assets/images/alstromeria.jpg'
    };
    this.slides[1] = {
      src: 'assets/images/delfinium.jpg'
    };
    this.slides[2] = {
      src: 'assets/images/statice.jpg'
    };

  }
}