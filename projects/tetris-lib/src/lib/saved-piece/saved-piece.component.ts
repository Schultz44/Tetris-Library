import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import cloneDeep_ from 'lodash.clonedeep';
import { Piece } from '../../shared/models/piece';
import { PieceService } from '../../shared/services/piece.service';
const cloneDeep = cloneDeep_;
@Component({
  selector: 'app-saved-piece',
  templateUrl: './saved-piece.component.html',
  styleUrls: ['./saved-piece.component.scss'],
  providers: [PieceService]
})
export class SavedPieceComponent implements OnInit {
  @Input() piece: Piece | undefined;
  @Input() set setPiece(value) {
    if (value && this.storedPiece) {
      this.emitPiece.emit(this.storedPiece);
      this.storePiece();
    } else if (value) {
      this.storePiece();
      this.emitFirstPiece.emit(true);
    }
    this._setPiece = value;
  }
  get setPiece() {
    return this._setPiece;
  }
  private _setPiece?: boolean;
  @Output() emitFirstPiece: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitPiece: EventEmitter<Piece> = new EventEmitter<Piece>();

  storedPiece?: Piece;
  pieceContainer = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ];
  constructor(private _pieceService: PieceService) {
    // this.generatePiece()
  }

  ngOnInit() {}

  storePiece() {
    this.storedPiece = cloneDeep(this._pieceService.pieces.find((p) => p.block.name == this.piece?.name)?.block);
    if (this.storedPiece) {
      this.storedPiece.fullShape = this.storedPiece.create(this.storedPiece);
      document.documentElement.style.setProperty('--storedPieceColor', this.storedPiece.color);
    }
  }
}
