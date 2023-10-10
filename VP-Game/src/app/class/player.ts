export class Player {
  position: {
    x: any;
    y: any;
    Image: any;
  };
  velocity: any;
  height: any;
  width: any;
  speed: number;
  // clr: any;

  constructor(position: any) {
    this.position = position;
    this.position.Image = position.Image;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.speed = 5;
    this.width = position.Image.width;
    this.height = position.Image.height;
    // this.height = 50;
    // this.width = 50;
    // this.clr;   
  }

  draw(context: any) {
    // if (!this.position.Image) return;
    context.fillStyle = 'rgba(0,0,0,0)';
    context.fillRect(this.position.x, this.position.y, 64, 64);

    // crop for animetion
    // const cropbox = {
    //   position: {
    //     x: 0,
    //     y: 0,
    //   },
    //   width: this.position.Image.width,
    //   height: this.position.Image.height,
    // };

    context.drawImage(
      this.position.Image,
      // cropbox.position.x,
      // cropbox.position.y,
      // cropbox.width,
      // cropbox.height,
      this.position.x,
      this.position.y,
      this.position.Image.width,
      this.position.Image.height,
    );
  }

  update(context: any, canvas: HTMLCanvasElement, gravity: number) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
  }
}
