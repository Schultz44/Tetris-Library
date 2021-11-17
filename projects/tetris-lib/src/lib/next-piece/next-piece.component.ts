import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import cloneDeep_ from 'lodash.clonedeep';
import { PieceService } from '../../shared/services/piece.service';
import { Piece } from '../../shared/models/piece';
import { getRandomInt } from '../../shared/utilites/math';
import { TBlock } from '../../shared/pieces/T-block';
import { SBlock } from '../../shared/pieces/S-block';
import { ZBlock } from '../../shared/pieces/Z-block';
import { IBlock } from '../../shared/pieces/I-block';
import { LBlock } from '../../shared/pieces/L-block';
import { JBlock } from '../../shared/pieces/J-block';
import { OBlock } from '../../shared/pieces/O-block';
const cloneDeep = cloneDeep_;

@Component({
  selector: 'app-next-piece',
  templateUrl: './next-piece.component.html',
  styleUrls: ['./next-piece.component.scss']
})
export class NextPieceComponent implements OnInit {
  @Input() set getPiece(value: boolean) {
    if (value) {
      this.emitPiece.emit(this.nextPiece);
      // this.generatePiece();
      this.useBagMethod();
    }
  }
  @Output() emitPiece: EventEmitter<Piece> = new EventEmitter<Piece>();
  clonedeep = cloneDeep;
  previousPiece?: Piece;
  nextPiece?: Piece;
  pieceContainer = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ];
  constructor(private _pieceService: PieceService) {
    // this.generatePiece()
    this.useBagMethod();
  }

  ngOnInit() {}

  generatePiece() {
    this.nextPiece = cloneDeep(this._pieceService.getRandomPiece(7));
    //rolls a second time if is the same piece just placed on the board
    if (this.previousPiece?.name == this.nextPiece.name) {
      this.nextPiece = cloneDeep(this._pieceService.getRandomPiece(7));
    } else this.previousPiece = this.nextPiece;
    document.documentElement.style.setProperty('--nextPieceColor', this.nextPiece.color);
  }
  // Puts 1 of each type of piece in a 'bag' and randomly picks a piece until empty.
  // Once empty it fulls the bag with all the pieces again
  useBagMethod() {
    if (this._pieceService.pieces.length === 0) {
      this._pieceService.resetPieces();
    }
    this.nextPiece = this._pieceService.getBagPiece();
    document.documentElement.style.setProperty('--nextPieceColor', this.nextPiece.color);
  }
}
