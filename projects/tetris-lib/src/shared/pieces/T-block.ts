import { Piece } from '../models/piece';

export class TBlock extends Piece{
    public block1 = [4,1];
    public block2 = [5,1];
    public block3 = [6,1];
    public block4 = [5,0];
    public color = '#a000f0';
    public name = 't';
    public origin = this.block2;

    rotate(counter: number){
        switch (counter) {
            case 1:
                this.block1[0] += 1;
                this.block1[1] += -1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += -1;
                this.block3[1] += 1;
                this.block4[0] += 1;
                this.block4[1] += 1;
                break;
            case 2:
                this.block1[0] += 1;
                this.block1[1] += 1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += -1;
                this.block3[1] += -1;
                this.block4[0] += -1;
                this.block4[1] += 1;
                break;
            case 3:
                this.block1[0] += -1;
                this.block1[1] += 1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += 1;
                this.block3[1] += -1;
                this.block4[0] += -1;
                this.block4[1] += -1;
                break;
            case 4:
                this.block1[0] += -1;
                this.block1[1] += -1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += 1;
                this.block3[1] += 1;
                this.block4[0] += 1;
                this.block4[1] += -1;
                break;
        
            default:
                break;
        }
    }
}