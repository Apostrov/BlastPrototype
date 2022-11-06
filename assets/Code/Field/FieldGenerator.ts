import { _decorator, Component, Node, Prefab, UITransform, Vec2, instantiate, Vec3, tween } from 'cc';
import { Block } from '../Block';
import { Field } from './Field';
const { ccclass, property } = _decorator;

@ccclass('FieldGenerator')
export class FieldGenerator extends Component {
    @property({ type: UITransform })
    public uiTransform: UITransform | null = null;

    public generateField(gridSize: Vec2, blockPrefab: Prefab, field: Field): Block[][] {
        let cellWidth: number = this.uiTransform.width / gridSize.x;
        let cellHeight: number = this.uiTransform.height / gridSize.y;
        let generatedField: Block[][] = [];
        for (let i = 0; i < gridSize.x; i++) {
            generatedField.push(new Array<Block>());
            for (let j = 0; j < gridSize.y; j++) {
                let block: Node = instantiate(blockPrefab);
                block.parent = this.node;

                let blockComponent: Block = block.getComponent(Block);
                blockComponent.init(new Vec2(i, j), field);
                blockComponent.chooseRandomColor();
                blockComponent.updatePosition(new Vec3(i * cellWidth, j * cellHeight, 0));
                generatedField[i].push(blockComponent);
            }
        }

        return generatedField;
    }

    public rearrangeField(field: Block[][]) {
        let cellWidth: number = this.uiTransform.width / field.length;
        let cellHeight: number = this.uiTransform.height / field[0].length;

        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] != null)
                    continue;

                let nextIndex = 1;
                while (j + nextIndex < field[i].length) {
                    let newJ = j + nextIndex;
                    let rearrange = field[i][newJ];
                    nextIndex++;
                    if (rearrange == null)
                        continue;

                    field[i][j] = rearrange;
                    field[i][newJ] = null;
                    rearrange.updateIndex(new Vec2(i, j));
                    rearrange.updatePosition(new Vec3(i * cellWidth, j * cellHeight, 0), true);
                    break;
                }
            }
        }
    }
}

