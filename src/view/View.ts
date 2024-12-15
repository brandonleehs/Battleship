export default class View {
  constructor() {
    if (this.constructor == View) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  public render(): void {
    throw new Error("Method 'render()' must be implemented.");
  }
}
