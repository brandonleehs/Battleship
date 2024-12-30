export default class Ring {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private CANVAS_WIDTH = 300;
  private CANVAS_HEIGHT = 150;
  private velocity = 1;
  private radius = 0;
  private x: number;
  private y: number;

  public constructor(x: number, y: number) {
    this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.x = x;
    this.y = y;

    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2;
    this.clearCanvas();
  }

  public ripple = (): void => {
    // clearCanvas must be in front for some reason
    this.clearCanvas();

    if (this.radius === 30) {
      return;
    }
    this.radius += this.velocity;
    this.draw();

    window.requestAnimationFrame(this.ripple);
  };

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
