import { Component, OnInit, Input, HostListener, ViewEncapsulation } from '@angular/core';
import clonedeep_ from 'lodash.clonedeep';
import { Piece } from '../../shared/models/piece';
import { OBlock } from '../../shared/pieces/O-block';
import { LBlock } from '../../shared/pieces/L-block';
import { IBlock } from '../../shared/pieces/I-block';
import { JBlock } from '../../shared/pieces/J-block';
import { ZBlock } from '../../shared/pieces/Z-block';
import { SBlock } from '../../shared/pieces/S-block';
import { TBlock } from '../../shared/pieces/T-block';
import { BoardService } from '../../shared/services/board.service';
import { PieceService } from '../../shared/services/piece.service';
const cloneDeep = clonedeep_;

export enum KEY_CODE {
  DOWN_ARROW = 'ArrowDown',
  RIGHT_ARROW = 'ArrowRight',
  UP_ARROW = 'ArrowUp',
  LEFT_ARROW = 'ArrowLeft',
  RIGHT_CTRL = 'ControlRight',
  SPACE = 'Space',
  RIGHT_SHIFT = 'ShiftRight',
  C = 'KeyC',
  X = 'KeyX'
}

@Component({
  selector: 'app-tetris-board',
  templateUrl: './tetris-board.component.html',
  styleUrls: ['./tetris-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TetrisBoardComponent implements OnInit {
  boardX = 0;
  boardY = 0;
  board: any[] = [[], []];
  b1: number[] = [];
  b2: number[] = [];
  b3: number[] = [];
  b4: number[] = [];
  pieceOutterPositions: number[] = [];
  startBlock: Piece = new Piece();
  ghostPiece: Piece = new Piece();
  futurePiece: Piece = new Piece();
  maxWidth = 0;
  maxHeight = 0;
  leftMost = 0;
  rightMost = 0;
  bottomMost = 0;
  topMost = 0;
  rotationCount: number = 0;
  checkRow: number = 0;
  completedRowCount: number = 0;
  timePlayed: number = 0;
  moveDownCounter: number = 0;
  getNextPiece = false;
  storePiece?: boolean;
  alreadyGotStoredPiece = false;
  removeRows: Array<number> = [];
  totalRowsRemoved = 0;
  lost = false;
  paused = false;
  windowWidth: number;
  constructor(private _boardService: BoardService, private _pieceService: PieceService) {
    setInterval(() => {
      if (!this.paused && !this.lost) {
        this.moveDown();
        this.timePlayed += 1;
      }
    }, 800 - this.totalRowsRemoved * 10);
    this.windowWidth = window.innerWidth;
  }

  onResize(event: any) {
    this.windowWidth = event?.currentTarget?.innerWidth;
  }
  ngOnInit() {
    this.boardX = 10;
    this.boardY = 21;
    this.board = this._boardService.createBoard();
    this.getNextPiece = true;
  }
  reset() {
    this.lost = false;
    this._pieceService.resetPieces();
    this.ngOnInit();
    document.getElementById('reset-btn')?.blur();
  }
  setPiece(newPiece: Piece) {
    this.startBlock = newPiece;
    this.setPieceEdges();
    //Ends game if a piece gets to the top
    if (!this.checkIfOpenBoardSpot('place')) {
      this.lost = true;
    }
    this.activeBlock(this.startBlock.block1[0], this.startBlock.block1[1]);
    setTimeout(() => {
      this.rotationCount = 0;
      this.getNextPiece = false;
    }, 1);
  }
  // generatePiece(number?) {
  //   this.rotationCount = 0;
  //   let pieces = [
  //     { block: new TBlock() },
  //     { block: new SBlock() },
  //     { block: new ZBlock() },
  //     { block: new IBlock() },
  //     { block: new LBlock() },
  //     { block: new JBlock() },
  //     { block: new OBlock() }
  //   ];
  //   if (number != undefined) {
  //     this.startBlock = pieces[number].block;
  //   }
  // }
  setPieceEdges() {
    this.maxWidth = this.startBlock.block1[0];
    this.maxHeight = this.startBlock.block1[1];
    this.leftMost = this.startBlock.block1[0];
    this.rightMost = 0;
    this.bottomMost = 0;
    this.topMost = 0;
    this.startBlock.fullShape = [];
    this.startBlock.fullShape.push(this.startBlock.block1, this.startBlock.block2, this.startBlock.block3, this.startBlock.block4);
    this.startBlock.fullShape.forEach((block) => {
      if (block[0] >= this.maxWidth) {
        this.rightMost = block[0];
      }
      if (block[0] <= this.leftMost) {
        this.leftMost = block[0];
      }
      if (block[1] <= this.maxHeight) {
        this.topMost = block[1];
      }
      if (block[1] >= this.bottomMost) {
        this.bottomMost = block[1];
      }
    });
    this.maxWidth = this.rightMost + 1 - this.leftMost;
    this.maxHeight = this.bottomMost + 1 - this.topMost;
    this.pieceOutterPositions = [];
    this.pieceOutterPositions.push(
      this.startBlock.fullShape.findIndex((i) => i[0] == this.rightMost),
      this.startBlock.fullShape.findIndex((i) => i[0] == this.leftMost),
      this.startBlock.fullShape.findIndex((i) => i[1] == this.topMost),
      this.startBlock.fullShape.findIndex((i) => i[1] == this.bottomMost)
    );
  }

  activeBlock(x: number, y: number): boolean {
    let block: any[] = [x, y];
    let flag = false;
    document.documentElement.style.setProperty('--color', this.startBlock.color);
    this.ghostPiece = cloneDeep(this.startBlock);
    for (let index = 0; index < this.startBlock.fullShape.length; index++) {
      const element = this.startBlock.fullShape[index];
      if (JSON.stringify(element) == JSON.stringify(block)) {
        this.b1 = this.startBlock.block1;
        this.b2 = this.startBlock.block2;
        this.b3 = this.startBlock.block3;
        this.b4 = this.startBlock.block4;
        while (this.down(this.ghostPiece) && this.checkIfOpenBoardSpot('down', this.ghostPiece)) {
          this.moveDown(this.ghostPiece);
        }
        flag = true;
        break;
      }
    }
    return flag;
  }
  right(): boolean {
    return this.startBlock.fullShape[this.pieceOutterPositions[0]][0] != this.boardX - 1 && this.checkIfOpenBoardSpot('right') == true;
  }
  left(): boolean {
    return this.startBlock.fullShape[this.pieceOutterPositions[1]][0] != 0 && this.checkIfOpenBoardSpot('left') == true;
  }
  down(piece: Piece = this.startBlock): boolean {
    return piece.fullShape[this.pieceOutterPositions[2]][1] != this.boardY - this.maxHeight;
  }
  moveDown(piece: Piece = this.startBlock) {
    setTimeout(() => {
      JSON.stringify(piece) == JSON.stringify(this.startBlock) ? this.moveDownCounter++ : null;
    }, 5);
    if (this.checkIfOpenBoardSpot('down') == false || !this.down()) {
      this.placePieceOnBoard();
    } else if (this.down()) {
      piece.fullShape.forEach((block) => {
        block[1]++;
      });
    }
  }
  @HostListener('window:keydown', ['$event'])
  move(event: KeyboardEvent) {
    if (!this.paused && !this.lost) {
      if (event.code === KEY_CODE.RIGHT_ARROW) {
        if (this.right()) {
          this.startBlock.fullShape.forEach((block) => {
            block[0]++;
          });
        }
      }
      if (event.code === KEY_CODE.LEFT_ARROW) {
        if (this.left()) {
          this.startBlock.fullShape.forEach((block) => {
            block[0]--;
          });
        }
      }
      if (event.code === KEY_CODE.DOWN_ARROW) {
        this.moveDown();
      }
      if (event.code === KEY_CODE.SPACE) {
        while (this.down() && this.checkIfOpenBoardSpot('down')) {
          this.moveDown();
        }
        this.placePieceOnBoard();
      }
      this.ghostPiece = cloneDeep(this.startBlock);
      while (this.down(this.ghostPiece) && this.checkIfOpenBoardSpot('down', this.ghostPiece)) {
        this.moveDown(this.ghostPiece);
      }
    }
  }
  //Checks to see if there is an open space on the board
  //depending on which direction the arrow key is pressed
  checkIfOpenBoardSpot(direction: string, piece: Piece = this.startBlock): boolean {
    switch (direction) {
      case 'down':
        if (
          this.board[piece.block1[0]][piece.block1[1] + 1] == null &&
          this.board[piece.block2[0]][piece.block2[1] + 1] == null &&
          this.board[piece.block3[0]][piece.block3[1] + 1] == null &&
          this.board[piece.block4[0]][piece.block4[1] + 1] == null
        ) {
          return true;
        }
        return false;
      case 'right':
        // Check if right most bound column exists
        if (
          this.board[piece.block1[0] + 1] &&
          this.board[piece.block2[0] + 1] &&
          this.board[piece.block3[0] + 1] &&
          this.board[piece.block4[0] + 1]
        ) {
          if (
            this.board[piece.block1[0] + 1][piece.block1[1]] == null &&
            this.board[piece.block2[0] + 1][piece.block2[1]] == null &&
            this.board[piece.block3[0] + 1][piece.block3[1]] == null &&
            this.board[piece.block4[0] + 1][piece.block4[1]] == null
          ) {
            return true;
          }
        }
        return false;
      case 'left':
        // Check if left most bound column exists
        if (
          this.board[piece.block1[0] - 1] &&
          this.board[piece.block2[0] - 1] &&
          this.board[piece.block3[0] - 1] &&
          this.board[piece.block4[0] - 1]
        ) {
          if (
            this.board[piece.block1[0] - 1][piece.block1[1]] == null &&
            this.board[piece.block2[0] - 1][piece.block2[1]] == null &&
            this.board[piece.block3[0] - 1][piece.block3[1]] == null &&
            this.board[piece.block4[0] - 1][piece.block4[1]] == null
          ) {
            return true;
          }
        }
        return false;
      case 'place':
        if (
          this.board[piece.block1[0]][piece.block1[1]] == null &&
          this.board[piece.block2[0]][piece.block2[1]] == null &&
          this.board[piece.block3[0]][piece.block3[1]] == null &&
          this.board[piece.block4[0]][piece.block4[1]] == null
        ) {
          return true;
        }
        return false;
      default:
        return false;
    }
  }

  //If the piece hits the bottom of the board
  //add that piece to the board position
  //position is found using the startBlocks individual block piece array
  //ex. block1 = [1,14]
  //    board[1][14] = startblock
  placePieceOnBoard() {
    this.alreadyGotStoredPiece = false;
    this.moveDownCounter = 0;
    this.board[this.startBlock.block1[0]][this.startBlock.block1[1]] = this.startBlock;
    this.board[this.startBlock.block2[0]][this.startBlock.block2[1]] = this.startBlock;
    this.board[this.startBlock.block3[0]][this.startBlock.block3[1]] = this.startBlock;
    this.board[this.startBlock.block4[0]][this.startBlock.block4[1]] = this.startBlock;
    this.checkForRowCompletion();
    this.rotationCount = 0;
    this.getNextPiece = true;
  }

  @HostListener('window:keydown.arrowUp', ['$event'])
  @HostListener('window:keydown.x', ['$event'])
  rotatePieceClockwise(event: KeyboardEvent) {
    if (!this.paused && !this.lost) {
      //this creates a test piece to rotate.
      //Once the test piece is rotated, it will check to see if that rotation is valid
      let testPiece: Piece = cloneDeep(this.startBlock);
      this.rotationCount == 4 ? (this.rotationCount = 1) : this.rotationCount++;
      testPiece.rotate(this.rotationCount);
      if (this.canRotate(testPiece)) {
        this.startBlock.rotate(this.rotationCount);
        this.ghostPiece.rotate(this.rotationCount);
        //this prevents block from rotating out of the board
        this.setPieceEdges();
        this.startBlock.fullShape.forEach((block) => {
          if (this.topMost == -1) {
            block[1]++;
          }
          if (this.leftMost == -1 || this.rightMost == -1) {
            block[0]++;
          } else if (this.leftMost == -2 || this.rightMost == -2) {
            block[0]++;
            block[0]++;
          }
          if (this.leftMost == 10 || this.rightMost == 10) {
            block[0]--;
          } else if (this.leftMost == 11 || this.rightMost == 11) {
            block[0]--;
            block[0]--;
          }
        });
        this.ghostPiece = cloneDeep(this.startBlock);
        while (this.down(this.ghostPiece) && this.checkIfOpenBoardSpot('down', this.ghostPiece)) {
          this.moveDown(this.ghostPiece);
        }
      } else this.rotationCount--;
    }
  }

  canRotate = (phantomPiece: Piece): boolean => {
    let can = false;
    let rotate = true;
    //prevents the piece from rotating outside the board
    for (const key in phantomPiece.fullShape) {
      if (phantomPiece.fullShape.hasOwnProperty(key)) {
        const element = phantomPiece.fullShape[key];
        if (element[0] == -1 || element[0] >= 10 || element[1] >= 20) {
          rotate = false;
        }
      }
    }
    //checks to see if the piece can be rotated on the board
    if (rotate) {
      for (let index = 0; index < 4; index++) {
        const block = phantomPiece.fullShape[index];
        if (this.board[block[0]][block[1]]) {
          can = false;
          break;
        } else {
          can = true;
        }
      }
    }
    return can;
  };

  checkForRowCompletion() {
    let fullRow: boolean = true;
    this.checkRow = 0;
    this.startBlock.fullShape.forEach((block) => {
      this.checkRow = block[1] > this.checkRow ? block[1] : this.checkRow;
    });
    for (let index = this.checkRow; index >= this.checkRow - (this.bottomMost + 1 - this.topMost); index--) {
      fullRow = true;
      for (let x = 9; x >= 0; x--) {
        if (!this.board[x][index]) {
          fullRow = false;
          break;
        }
      }
      if (fullRow) {
        this.totalRowsRemoved++;
        this.removeRows.push(index);
      }
    }
    // Scoring a tetris (getting 4 rows cleared at once)
    if (this.removeRows.length === 4) {
      this.totalRowsRemoved++;
    }
    this.removePiecesFromBoardRow(this.removeRows).then(() => {});
  }
  async removePiecesFromBoardRow(rows: Array<number>) {
    for (let i = 9; i >= 0; i--) {
      for (let row = 0; row < rows.length; row++) {
        const element = rows[row];
        // waits for the element to be applied to DOM correctly. 0 seconds will execute on next event cycle
        setTimeout(() => {
          document.getElementById(`x${i}-y${element}`)?.firstElementChild?.classList.add('disolved');
        }, 0);
        // Wait for animaation to complete
        setTimeout(() => {
          document.getElementById(`x${i}-y${element}`)?.firstElementChild?.classList.remove('disolved');
          this.board[i][element] = null;
          if (i == 0 && row == rows.length - 1) {
            this.pushRowsDown(rows);
          }
        }, 210);
      }
    }
  }
  pushRowsDown(rows: Array<number>) {
    for (let i = 9; i >= 0; i--) {
      for (let j = rows[0] - 1; j >= 0; j--) {
        if (this.board[i][j]) {
          this.board[i][j + rows.length] = this.board[i][j];
          this.board[i][j] = null;
        }
      }
    }
    this.moveDown(this.ghostPiece);
    this.removeRows = [];
  }
  @HostListener('window:keydown.shift', ['$event'])
  @HostListener('window:keydown.c', ['$event'])
  savePiece(event: KeyboardEvent) {
    if (!this.paused && !this.lost) {
      if (!this.alreadyGotStoredPiece) {
        this.storePiece = true;
        setTimeout(() => {
          this.storePiece = false;
        }, 1);
        this.alreadyGotStoredPiece = true;
      }
    }
  }
}
