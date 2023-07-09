import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../class/player';
import { Platforms } from '../class/Platforms';
import { BGimg } from '../class/bgimg';

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
    
    let player1 = new Player({
      x: 100,
      y: 400,
    }) 
    let Platform: any[] = [
      new Platforms({ x: 0, y: 525, Image: ImgSrc('platform1') }),
      new Platforms({ x: 192, y: 525, Image: ImgSrc('platform1') }),
    ]
    let bgimg: any[] = []
    let scrollOffSet = 0

    const gravity = 0.6;
    const keys = {
      d: { pressed: false, },
      a: { pressed: false, },
      jump: {pressd: false, }
    }
    
    function ImgSrc(source:any){
      const imgname = new Image()
      imgname.src = '../../assets/images/'+source+'.png'
      return imgname;
    }

    function pushToPlatform() {
      const newObj = [];
      let x = 300 + (Platform.length - 2) * 400;
      while (x <= 7100) {
        const baseY = Math.floor(Math.random() * 251) + 100; // Random number between 100 and 350
        const y = baseY + Math.floor(Math.random() * 251); // Random number between baseY and baseY + 250
        const img = Math.random() < 0.5 ? ImgSrc('platform2') : ImgSrc('platform3'); // Randomly choose between "img1" and "img2"
    
        newObj.push(new Platforms({ x, y, Image: img }));
        x += 400;
      }
      Platform = Platform.concat(newObj);
    }
    
    function init(){
       player1 = new Player({
        x: 100,
        y: 400,
      })
       Platform = [
        new Platforms({ x: 0, y: 525, Image: ImgSrc('platform1') }),
        new Platforms({ x: 192, y: 525, Image: ImgSrc('platform1') }), // start
        new Platforms({ x: 7500, y: 200, Image: ImgSrc('platform2') }), // win conditi0n
      ]
      pushToPlatform();
      
       bgimg = [
        new BGimg({ x: 0, y: 0, Image: ImgSrc('map') })
      ]
       scrollOffSet = 0
    }

    function animate(){
      window.requestAnimationFrame(animate)
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      bgimg.forEach((bimg) => {
        bimg.draw(context)
      })
      Platform.forEach((platform) => {
        platform.draw(context)
      })
      
      player1.update(context,canvas,gravity)
      player1.velocity.x = 0

      //movement
      if (keys.d.pressed && player1.position.x < 400 || keys.d.pressed && scrollOffSet === 7500 && player1.position.x > 0 ) player1.velocity.x = 5 //win stop scroll
      else if (keys.a.pressed && player1.position.x > 100 || keys.a.pressed && scrollOffSet === 0 && player1.position.x > 0 ) player1.velocity.x = -5 //dont go back
      else{
        player1.velocity.x = 0

        if (keys.d.pressed) {
          scrollOffSet += player1.speed
          Platform.forEach((platform) => {
            platform.position.x -= player1.speed
          })
          bgimg.forEach((bimg) => {
            bimg.position.x -= player1.speed * .5
          })
        }
        else if (keys.a.pressed && scrollOffSet > 0) {
          scrollOffSet -= player1.speed
          Platform.forEach((platform) => {
            platform.position.x += player1.speed
          })
          bgimg.forEach((bimg) => {
            bimg.position.x += player1.speed * .5
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

      if (scrollOffSet > 7500) {
        console.log("win")
      }

      if (player1.position.y > canvas.height) {
        init()
      }
    }

    init()
    animate()

    
    addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'd':
          keys.d.pressed = true
          break
        case 'a':
          keys.a.pressed = true
          break
        case ' ':
          if (!keys.jump.pressd) {
            keys.jump.pressd = true;
            player1.velocity.y = -20;
          }
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
        case ' ':
          keys.jump.pressd = false;
          break
        
      }
      })
  }
  
  constructor(){
    
  }
}
