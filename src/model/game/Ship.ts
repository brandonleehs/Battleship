import Orientation from 'Model/game/Orientation';

export default class Ship {
  private readonly size: number;
  private hits = 0;
  private orientation: Orientation;

  public constructor(size: number, orientation: Orientation) {
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
