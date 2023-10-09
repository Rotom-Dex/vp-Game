import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Player } from '../class/player';
import { Platforms } from '../class/Platforms';
import { BGimg } from '../class/bgimg';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  @ViewChild('canvas', { static: true }) c: any;
  ngOnInit(): void {
    const leftImage = document.getElementById('left-image') as HTMLImageElement;
    const rightImage = document.getElementById('right-image') as HTMLImageElement;
    const jumpImage = document.getElementById('jump-image') as HTMLImageElement;

    const canvas = this.c.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 576;

    let player1 = new Player({
      x: 0,
      y: 600,
      Image: ImgSrc('slime_idol')
    });
    //charecter animation
    // player1.clr = 'gold';

    let Platform: any[] = [];
    let bgimg: any[] = [];
    let scrollOffSet = 0;

    const gravity = 0.7;
    const keys = {
      d: { pressed: false },
      a: { pressed: false },
      jump: { pressd: false },
    };

    function ImgSrc(source: any) {
      const imgname = new Image();
      imgname.src = '../../assets/images/' + source + '.png';
      return imgname;
    }

    function pushToPlatform(yIn: any) {
      const newObj = [];
      let x = 0;
      while (x <= 8500) {
        newObj.push(new Platforms({ x, y: yIn, Image: ImgSrc('platform1') }));
        x += 192;
      }
      Platform = Platform.concat(newObj);
    }

    function init() {
      player1 = new Player({
        x: 100,
        y: 100,
        Image: ImgSrc('slime_idol')
      });
      //charecter animation
      
      pushToPlatform(288);
      pushToPlatform(574)
      
      bgimg = [new BGimg({ x: 0, y: 0, Image: ImgSrc('map') })];
      scrollOffSet = 0;
    }


    function animate() {
      window.requestAnimationFrame(animate);
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

      bgimg.forEach((bimg) => {
        bimg.draw(context);
      });
      Platform.forEach((platform) => {
        platform.draw(context);
      });

      player1.update(context, canvas, gravity);
      player1.velocity.x = 0;

      //movement
      if (
        (keys.d.pressed && player1.position.x < 400) ||
        (keys.d.pressed && scrollOffSet === 7500 && player1.position.x > 0)
      )
        player1.velocity.x = 5; //win stop scroll
      else if (
        (keys.a.pressed && player1.position.x > 100) ||
        (keys.a.pressed && scrollOffSet === 0 && player1.position.x > 0)
      )
        player1.velocity.x = -5; //dont go back
      else {
        player1.velocity.x = 0;

        if (keys.d.pressed) {
          scrollOffSet += player1.speed;
          Platform.forEach((platform) => {
            platform.position.x -= player1.speed;
          });
          bgimg.forEach((bimg) => {
            bimg.position.x -= player1.speed * 0.5;
          });
        } else if (keys.a.pressed && scrollOffSet > 0) {
          scrollOffSet -= player1.speed;
          Platform.forEach((platform) => {
            platform.position.x += player1.speed;
          });
          bgimg.forEach((bimg) => {
            bimg.position.x += player1.speed * 0.5;
          });
        }
      }

      //collition detection
      Platform.forEach((platform) => {
        if (
          player1.position.y + player1.height <= platform.position.y &&
          player1.position.y + player1.height + player1.velocity.y >=
            platform.position.y &&
          player1.position.x + player1.width >= platform.position.x &&
          player1.position.x <= platform.position.x + platform.width
        ) {
          player1.velocity.y = 0;
        }
      });

      if (player1.position.y > canvas.height) {
        init();
      }
    }
    
    animate();
    init();

    //charecter animation player.clr = "color"
    addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'd':
          player1.position.Image = ImgSrc('slime_idol')
          keys.d.pressed = true;
          break;
        case 'a':
          player1.position.Image = ImgSrc('slime_idol_left')
          keys.a.pressed = true;
          break;
        case ' ':
          keys.jump.pressd = false;
          break;
      }
    });
    addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'd':
          keys.d.pressed = false;
          break;
        case 'a':
          keys.a.pressed = false;
          break;
        case ' ':
          keys.jump.pressd = true;
          player1.velocity.y = -20;
          break;
      }
    });

    //experimental 
    function triggerKeyEvent(key: string, isKeyDown: boolean) {
      const event = new KeyboardEvent(isKeyDown ? 'keydown' : 'keyup', {
        key: key,
      });
      window.dispatchEvent(event);
    }
    function addEventListenersWithKey(element: HTMLElement, key: string) {
      element.addEventListener('touchstart', () => {
        triggerKeyEvent(key, true);
      });
      element.addEventListener('touchend', () => {
        triggerKeyEvent(key, false);
      });
    
      element.addEventListener('mousedown', () => {
        triggerKeyEvent(key, true);
      });
      element.addEventListener('mouseup', () => {
        triggerKeyEvent(key, false);
      });
    }
    
    addEventListenersWithKey(leftImage, 'a');
    addEventListenersWithKey(rightImage, 'd');
    addEventListenersWithKey(jumpImage, ' ');
  }

  constructor() {}
}
