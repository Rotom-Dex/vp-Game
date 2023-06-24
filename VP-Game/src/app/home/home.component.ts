import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../class/player';
import { Platforms } from '../class/Platforms';

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

    canvas.width = 1024;
    canvas.height = 576;
    
    const player1 = new Player({
      x: 0,
      y: 0,
    })
    const platImg1 = new Image()
    platImg1.src = '../../assets/images/platform1.png'
    const Platform = [
      new Platforms({ x: 200, y: 300, Image: platImg1 }),
      // new Platforms({ x: 600, y: 400 }),
      // new Platforms({ x: 800, y: 200 }),
    ]
    
    const gravity = 0.6;
    const keys = {
      d: { pressed: false, },
      a: { pressed: false, }
    }
    let scrollOffSet = 0

    function animate(){
      window.requestAnimationFrame(animate)
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      Platform.forEach((platform) => {
        platform.draw(context)
      })
      
      player1.update(context,canvas,gravity)
      player1.velocity.x = 0

      //movement
      if (keys.d.pressed && player1.position.x < 400) player1.velocity.x = 5
      else if (keys.a.pressed && player1.position.x > 100) player1.velocity.x = -5
      else{
        player1.velocity.x = 0

        if (keys.d.pressed) {
          scrollOffSet += 5
          Platform.forEach((platform) => {
            platform.position.x -= 5
          })
        }
        else if (keys.a.pressed) {
          scrollOffSet -= 5
          Platform.forEach((platform) => {
            platform.position.x += 5
          })
        }

      }

      //collition detection
      Platform.forEach((platform)=>{
        if (
          player1.position.y + player1.height <= platform.position.y 
          && player1.position.y + player1.height + player1.velocity.y >= platform.position.y 
          && player1.position.x + player1.width >= platform.position.x 
          && player1.position.x <= platform.position.x + platform.width) {
          player1.velocity.y = 0
          }
      })

      if (scrollOffSet > 2000) {
        console.log("win Condition")
      } else {

      }
    }
    animate()

    window.addEventListener('keydown', (event) => {
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
      addEventListener('keyup', (event) => {
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
