export class Player {
    position: any;
    velocity: any;
    height: any;
  
    constructor(position: any) {
      this.position = position;
      this.velocity = {
        x: 0,
        y: 1
      };
      this.height = 100;
    }
  
    draw(context: any) {
      context.fillStyle = 'red';
      context.fillRect(this.position.x, this.position.y, 100, 100);
    }
  
    update(context: any,canvas: HTMLCanvasElement, gravity: number) {
      this.draw(context);

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if(this.position.y + this.height + this.velocity.y < canvas.height)
        this.velocity.y += gravity;
      else this.velocity.y = 0
    }
  }
  
