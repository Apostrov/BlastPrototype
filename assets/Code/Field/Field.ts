import { _decorator, Component, Node, UITransform, Prefab, Vec2 } from 'cc';
import { Block, BlockColor } from '../Block';
import { FieldBlastSolver } from './FieldBlastSolver';
import { FieldGenerator } from './FieldGenerator';
const { ccclass, property } = _decorator;

@ccclass('Field')
export class Field extends Component {
    @property
    public minBlastGroup: number = 2;

    @property({ type: Vec2 })
    public gridSize: Vec2 = new Vec2(9, 10);

    @property({ type: Prefab })
    public block: Prefab | null = null;

    @property({ type: FieldGenerator })
    public fieldGenerator: FieldGenerator | null = null;

    private field: Block[][] = [];

    start() {
        this.field = this.fieldGenerator.generateField(this.gridSize, this.block, this);
    }

    public blockPressed(block: Block) {
        let toDestroy : Block[] = FieldBlastSolver.dfsBlastSolve(block, this.field);
        if(toDestroy.length < this.minBlastGroup) {
            return;
        }
        toDestroy.forEach((element) => element.node.destroy());
    }
}

