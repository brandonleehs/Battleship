export default class Coordinate {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    if (x > 25 || y > 25) {
      throw new Error('Coordinate system has a maximum limit of 25 by 25!');
    }

    this.x = x;
    this.y = y;
  }

  public equals = (coordinate: Coordinate): boolean => {
    return this.x === coordinate.getX() && this.y === coordinate.getY();
  };

  public toString = (): string => {
    let asciiUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return asciiUppercase.charAt(this.x) + (this.y + 1).toString();
  };

  public getX = (): number => {
    return this.x;
  };

  public getY = (): number => {
    return this.y;
  };
}
