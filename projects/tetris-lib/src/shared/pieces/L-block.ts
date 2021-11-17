import { Piece } from '../models/piece';

export class LBlock extends Piece{
    public block1 = [6,0];
    public block2 = [6,1];
    public block3 = [5,1];
    public block4 = [4,1];
    public color = '#f0a000';
    public name = 'l';
    public origin = this.block3;

    rotate(counter: number) {
        switch (counter) {
            case 1:
                this.block1[0] += 0;
                this.block1[1] += 2;
                this.block2[0] += -1;
                this.block2[1] += 1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += 1;
                this.block4[1] += -1;
                break;
            case 2:
                this.block1[0] += -2;
                this.block1[1] += 0;
                this.block2[0] += -1;
                this.block2[1] += -1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += 1;
                this.block4[1] += 1;
                break;
            case 3:
                this.block1[0] += 0;
                this.block1[1] += -2;
                this.block2[0] += 1;
                this.block2[1] += -1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += -1;
                this.block4[1] += 1;
                break;
            case 4:
                this.block1[0] += 2;
                this.block1[1] += 0;
                this.block2[0] += 1;
                this.block2[1] += 1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += -1;
                this.block4[1] += -1;
                break;

            default:
                break;
        }
    }
}