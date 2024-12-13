export default class Ship {
  protected readonly size: number;
  protected hits = 0;

  protected constructor(size: number) {
    if (this.constructor == Ship) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.size = size;
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
}
