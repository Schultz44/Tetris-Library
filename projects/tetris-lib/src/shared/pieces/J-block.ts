import { Piece } from '../models/piece';

export class JBlock extends Piece {
    public block1 = [4, 0];
    public block2 = [4, 1];
    public block3 = [5, 1];
    public block4 = [6, 1];
    public color = '#0000f0';
    public name = 'j';
    public origin = this.block3;

    rotate(counter: number) {
        switch (counter) {
            case 1:
                this.block1[0] += 2;
                this.block1[1] += 0;
                this.block2[0] += 1;
                this.block2[1] += -1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += -1;
                this.block4[1] += 1;
                break;
            case 2:
                this.block1[0] += 0;
                this.block1[1] += 2;
                this.block2[0] += 1;
                this.block2[1] += 1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += -1;
                this.block4[1] += -1;
                break;
            case 3:
                this.block1[0] += -2;
                this.block1[1] += 0;
                this.block2[0] += -1;
                this.block2[1] += 1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += 1;
                this.block4[1] += -1;
                break;
            case 4:
                this.block1[0] += 0;
                this.block1[1] += -2;
                this.block2[0] += -1;
                this.block2[1] += -1;
                this.block3[0] += 0;
                this.block3[1] += 0;
                this.block4[0] += 1;
                this.block4[1] += 1;
                break;

            default:
                break;
        }
    }
}