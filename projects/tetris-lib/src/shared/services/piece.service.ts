import { Injectable } from '@angular/core';
import { TBlock } from '../pieces/T-block';
import { SBlock } from '../pieces/S-block';
import { ZBlock } from '../pieces/Z-block';
import { IBlock } from '../pieces/I-block';
import { LBlock } from '../pieces/L-block';
import { JBlock } from '../pieces/J-block';
import { OBlock } from '../pieces/O-block';
import { Piece } from '../models/piece';
import { getRandomInt } from '../utilites/math';

@Injectable()
export class PieceService {

  pieces = [
    { block: new TBlock() },
    { block: new SBlock() },
    { block: new ZBlock() },
    { block: new IBlock() },
    { block: new LBlock() },
    { block: new JBlock() },
    { block: new OBlock() }
  ];
  randomNumber = 7;
  constructor() { }
  resetPieces(){
    this.randomNumber = 7
    this.pieces = [
      { block: new TBlock() },
      { block: new SBlock() },
      { block: new ZBlock() },
      { block: new IBlock() },
      { block: new LBlock() },
      { block: new JBlock() },
      { block: new OBlock() }
    ]    
  }
  getBagPiece(): Piece{
    const piece = this.pieces[getRandomInt(this.randomNumber)].block;
    this.pieces = this.pieces.filter(block => block.block.name != piece.name);
    this.randomNumber--
    return piece
  }
  getRandomPiece(number: number): Piece{
    return this.pieces[getRandomInt(7)].block
  }
}
