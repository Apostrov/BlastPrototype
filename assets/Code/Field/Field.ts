import { _decorator, Component, Node, UITransform, Prefab, Vec2 } from 'cc';
import { Block } from '../Block';
import { FieldGenerator } from './FieldGenerator';
const { ccclass, property } = _decorator;

@ccclass('Field')
export class Field extends Component {
    @property({type: Vec2})
    public gridSize : Vec2 = new Vec2(9, 10);

    @property({type: Prefab})
    public block : Prefab|null = null;

    @property({type: FieldGenerator})
    public fieldGenerator : FieldGenerator|null = null;

    start() {
        this.fieldGenerator.generateField(this.gridSize, this.block, this);
    }

    public blockPressed(block: Block) {
        block.node.destroy();
    }
}

