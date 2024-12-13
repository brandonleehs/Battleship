import Orientation from './Orientation';

export default class Ship {
  protected readonly size: number;
  protected hits = 0;
  protected orientation: Orientation;

  protected constructor(size: number, orientation: Orientation) {
    if (this.constructor == Ship) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.size = size;
    this.orientation = orientation;
  }

  public takesHit(): void {
    this.hits++;
  }

  public isSunk(): boolean {
    return this.hits >= this.size;
  }

  public getSize(): number {
    return this.size;
  }

  public getHits(): number {
    return this.hits;
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public setOrientation(orientation: Orientation): void {
    this.orientation = orientation;
  }
}
