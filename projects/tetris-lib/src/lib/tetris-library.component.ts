import { Component, OnInit } from '@angular/core';
import { TBlock } from '../shared/pieces/T-block';
import { SBlock } from '../shared/pieces/S-block';
import { ZBlock } from '../shared/pieces/Z-block';
import { IBlock } from '../shared/pieces/I-block';
import { LBlock } from '../shared/pieces/L-block';
import { JBlock } from '../shared/pieces/J-block';
import { OBlock } from '../shared/pieces/O-block';

@Component({
  selector: 'tetris-library',
  template: ` <app-tetris-board></app-tetris-board> `,
  styles: []
})
export class TetrisLibraryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    document.documentElement.style.setProperty('--T', new TBlock().color);
    document.documentElement.style.setProperty('--S', new SBlock().color);
    document.documentElement.style.setProperty('--Z', new ZBlock().color);
    document.documentElement.style.setProperty('--I', new IBlock().color);
    document.documentElement.style.setProperty('--L', new LBlock().color);
    document.documentElement.style.setProperty('--J', new JBlock().color);
    document.documentElement.style.setProperty('--O', new OBlock().color);
  }
}
