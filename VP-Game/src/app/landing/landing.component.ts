import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  imgP: string | undefined;
  constructor() {
    this.imgP = '../../assets/images/map.png';
  }
}
