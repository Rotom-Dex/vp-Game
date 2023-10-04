export class Platforms {
  position: {
    x: any;
    y: any;
    Image: any;
  };
  width: number;
  height: number;
  img: any;

  constructor(position: any) {
    this.position = position;
    this.position.Image = position.Image;
    this.width = position.Image.width;
    this.height = position.Image.height;
  }
  draw(c: any) {
    c.drawImage(this.position.Image, this.position.x, this.position.y);
  }
}
