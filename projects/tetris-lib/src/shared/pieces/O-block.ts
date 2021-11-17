import { Piece } from '../models/piece';

export class OBlock extends Piece{
    public block1 = [4,0];
    public block2 = [5,0];
    public block3 = [5,1];
    public block4 = [4,1];
    public color = '#f0f000';
    public name = 'o';
    public origin = this.block4;

    rotate(counter: number) {
        switch (counter) {

            default:
                break;
        }
    }
}