import { _decorator, Component, Prefab, Vec2 } from 'cc';
import { Block } from '../Block/Block';
import { LoseScreen } from '../UI/LoseScreen';
import { FieldBlastSolver } from './FieldBlastSolver';
import { FieldGenerator } from './FieldGenerator';
const { ccclass, property } = _decorator;

@ccclass('Field')
export class Field extends Component {
    @property
    public minBlastGroup: number = 2;
    @property
    public maxFieldRefresh: number = 3;
    @property({ type: Vec2 })
    public gridSize: Vec2 = new Vec2(9, 10);
    @property({ type: Prefab })
    public block: Prefab | null = null;
    @property({ type: FieldGenerator })
    public fieldGenerator: FieldGenerator | null = null;
    @property({type: LoseScreen})
    public loseScreen: LoseScreen | null = null;

    private field: Block[][] = [];
    private refreshCount: number = 0;

    start() {
        this.field = new Array(this.gridSize.x)
            .fill(null)
            .map(() =>
                new Array(this.gridSize.y).fill(null)
            );
        this.fieldGenerator.fillEmptyBlocks(this.field, this.block, this);
        this.tryRefreshField();
    }

    public blockPressed(block: Block) {
        let toDestroy: Block[] = FieldBlastSolver.dfsBlastSolve(block, this.field);
        if (toDestroy.length < this.minBlastGroup) {
            toDestroy.forEach((block) => block.cantDestroy());
            return;
        }
        toDestroy.forEach((element) => {
            let index = element.getIndex();
            this.field[index.x][index.y] = null;
            element.destroyBlock();
        });
        this.fieldGenerator.rearrangeField(this.field);
        this.fieldGenerator.fillEmptyBlocks(this.field, this.block, this);
        this.tryRefreshField();
    }


    private tryRefreshField() {
        if (FieldBlastSolver.isFieldSolvable(this.field))
            return;

        if (this.refreshCount >= this.maxFieldRefresh) {
            return
        }

        this.field.forEach((element) => {
            element.forEach((block) => block.destroyBlock())
            element.fill(null);
        });
        this.fieldGenerator.fillEmptyBlocks(this.field, this.block, this);
        this.refreshCount++;

        this.tryRefreshField();
    }
}

