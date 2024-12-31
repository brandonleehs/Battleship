export default class Ring {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private CANVAS_WIDTH = 300;
  private CANVAS_HEIGHT = 150;
  private velocity = 0.5;
  private radius = 0;
  private x: number;
  private y: number;

  public constructor(x: number, y: number) {
    this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.x = x;
    this.y = y;

    this.ctx.strokeStyle = 'rgb(249,182,78)';
    this.ctx.lineWidth = 2;
    this.clearCanvas();
  }

  public ripple = (): void => {
    if (this.radius >= 10) {
      this.clearCanvas();
      return;
    }

    // Explosion color palette
    const colorArr = [
      'rgb(255,247,93)',
      'rgb(255,193,31)',
      'rgb(254,101,13)',
      'rgb(243,60,4)',
      'rgb(218,31,5)',
      'rgb(161,1,0)',
    ];

    if (this.radius <= 5) {
      this.ctx.fillStyle = colorArr[0];
      this.ctx.strokeStyle = colorArr[0];
      this.draw();
      this.ctx.fill();
      this.radius += this.velocity;
      this.ctx.save();
    } else {
      this.ctx.restore();
      this.ctx.lineWidth = 2;
      this.velocity = 0.05;
      for (const color of colorArr) {
        this.ctx.strokeStyle = color;
        this.draw();
        this.radius += this.velocity;
      }
    }

    window.requestAnimationFrame(this.ripple);
  };

  // private smoke = (flag: number): void => {
  // const colorArr = [
  //   'rgb(203,53,61)',
  //   'rgb(249,182,78)',
  //   'rgb(237,98,64)',
  //   'rgb(86,61,67)',
  //   'rgb(106,74,87)',
  // ];
  //   if (flag >= 30) return;

  //   if (flag < 10) {
  //     this.ctx.fillStyle = 'rgb(106,74,87)';
  //     this.ctx.fill();
  //   } else if (flag < 20) {
  //     this.ctx.fillStyle = 'rgb(86,61,67)';
  //     this.ctx.fill();
  //   }
  //   flag++;
  //   window.requestAnimationFrame(() => this.smoke(flag));
  // };

  private draw = () => {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  };

  private clearCanvas = (): void => {
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
  };
}
