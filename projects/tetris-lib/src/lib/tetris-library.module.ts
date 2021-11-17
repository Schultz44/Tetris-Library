import { NgModule } from '@angular/core';
import { TetrisLibraryComponent } from './tetris-library.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TetrisBoardModule } from './tetris-board/tetris-board.module';

@NgModule({
  declarations: [TetrisLibraryComponent],
  imports: [FormsModule, CommonModule, TetrisBoardModule],
  bootstrap: [TetrisLibraryComponent],
  exports: [TetrisLibraryComponent]
})
export class TetrisLibraryModule {}
