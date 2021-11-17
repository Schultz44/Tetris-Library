import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TetrisBoardComponent } from './tetris-board.component';
import { NextPieceComponent } from '../next-piece/next-piece.component';
import { SavedPieceComponent } from '../saved-piece/saved-piece.component';
import { PieceService } from '../../shared/services/piece.service';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule],
  declarations: [TetrisBoardComponent, NextPieceComponent, SavedPieceComponent],
  exports: [TetrisBoardComponent],
  providers: [PieceService]
})
export class TetrisBoardModule {}
