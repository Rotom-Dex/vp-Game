import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from './player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('canvas', {static: true}) c: any;
  ngOnInit(): void {
    const canvas = this.c.nativeElement;
    const context = canvas.getContext('2d');
    const gravity = 0.6;

    canvas.width = 1024;
    canvas.height = 576;


    const player1 = new Player({
      x: 0,
      y: 0,
    })

    const keys = {
      d: {
        pressed: false,
      },
      a: {
        pressed: false,
      }
    }

    function animate(){
      window.requestAnimationFrame(animate)
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      player1.update(context,canvas,gravity)

      player1.velocity.x = 0
      if (keys.d.pressed) player1.velocity.x = 2
      else if (keys.a.pressed) player1.velocity.x = -2
    }
    animate()

    window.addEventListener('keydown', (event) => {
      console.log(event)
      switch (event.key) {
        case 'd':
          keys.d.pressed = true
          break
        case 'a':
          keys.a.pressed = true
          break
        case ' ':
          player1.velocity.y = -20
          break
      }
    })
      window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'd':
          keys.d.pressed = false
          break
        case 'a':
          keys.a.pressed = false
          break
      }
      })
  }
  
  constructor(){
    
  }
}
