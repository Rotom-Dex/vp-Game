export class Player {
  position: any;
  velocity: any;
  height: any;
  width: any;
  speed: number;
  clr: any;

  constructor(position: any) {
    this.position = position;
    this.position.Image = position.Image;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.speed = 5;
    this.height = 50;
    this.width = 50;
    this.clr;
  }

  draw(context: any) {
    context.fillStyle = this.clr;
    context.fillRect(this.position.x, this.position.y, 50, 50);
  }

  update(context: any, canvas: HTMLCanvasElement, gravity: number) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
  }
}
