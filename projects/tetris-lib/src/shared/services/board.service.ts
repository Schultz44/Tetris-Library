import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class BoardService {
    constructor(){}
    createBoard() {
        let board: any[] = [[], []]
        for (let i = 0; i < 10; i++) {
            board[i] = this.createBoardY();
        }
        return board
    }
    private createBoardY(): Array<any> {
        let array = [];
        for (let i = 0; i < 21; i++) {
            array.push(null);
        }
        return array
    }
}