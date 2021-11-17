export class Piece {
  public block1: number[] = [];
  public block2: number[] = [];
  public block3: number[] = [];
  public block4: number[] = [];
  public color: string = '';
  public fullShape: number[][] = [];
  public name: string = '';
  public origin?: number[];

  public bottomMost?: number[];
  public rightMost?: number[];
  public leftMost?: number[];
  public topMost?: number[];

  constructor(data = {}) {
    Object.assign(this, data);
  }

  create(piece: Piece): number[][] {
    return [piece.block1, piece.block2, piece.block3, piece.block4];
  }
  rotate(counter: number) {}
}
