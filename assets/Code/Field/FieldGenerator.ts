import { _decorator, Component, Node, Prefab, UITransform, Vec2, instantiate, Vec3 } from 'cc';
import { Block } from '../Block';
const { ccclass, property } = _decorator;

@ccclass('FieldGenerator')
export class FieldGenerator extends Component {
    @property({type: UITransform})
    public utTransform : UITransform|null = null;
    
    public generateField( gridSize: Vec2, blockPrefab: Prefab) {
        let cellWidth : number = this.utTransform.width / gridSize.x;
        let cellHeight : number = this.utTransform.height / gridSize.y;
        for(let i = 0; i < gridSize.x; i++) {
            for(let j = 0; j < gridSize.y; j++) {
                let block : Node = instantiate(blockPrefab);
                block.setParent(this.node);
                block.setPosition(new Vec3(i * cellWidth, j * cellHeight, 0));
                block.getComponent(Block).chooseRandomColor();
            }
        }
    }
}

