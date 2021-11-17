import { Piece } from '../models/piece';

export class ZBlock extends Piece{
    public block1 = [4,0];
    public block2 = [5,0];
    public block3 = [5,1];
    public block4 = [6,1];
    public color = '#f00000';
    public name = 'z';
    public origin = this.block2;

    rotate(counter: number){
        switch (counter) {
            case 1:
                this.block1[0] += 1;
                this.block1[1] += -1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += -1;
                this.block3[1] += -1;
                this.block4[0] += -2;
                this.block4[1] += 0;
                break;
            case 2:
                this.block1[0] += 1;
                this.block1[1] += 1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += 1;
                this.block3[1] += -1;
                this.block4[0] += 0;
                this.block4[1] += -2;
                break;
            case 3:
                this.block1[0] += -1;
                this.block1[1] += 1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += 1;
                this.block3[1] += 1;
                this.block4[0] += 2;
                this.block4[1] += 0;
                break;
            case 4:
                this.block1[0] += -1;
                this.block1[1] += -1;
                this.block2[0] += 0;
                this.block2[1] += 0;
                this.block3[0] += -1;
                this.block3[1] += 1;
                this.block4[0] += 0;
                this.block4[1] += 2;
                break;
        
            default:
                break;
        }
    }
}