import { _decorator, Component, Node, Prefab, UITransform, Vec2, instantiate, Vec3 } from 'cc';
import { Block } from '../Block/Block';
import { IBlock } from '../Block/IBlock';
const { ccclass, property } = _decorator;

@ccclass('FieldGenerator')
export class FieldGenerator extends Component {
    @property({ type: UITransform })
    public uiTransform: UITransform | null = null;

    public fillEmptyBlocks(field: IBlock[][], blockPrefab: Prefab, onBlockPress: (block: IBlock) => void) {
        let cellWidth: number = this.uiTransform.width / field.length;
        for (let i = 0; i < field.length; i++) {
            let cellHeight: number = this.uiTransform.height / field[i].length;

            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] != null)
                    continue;

                let block: Node = instantiate(blockPrefab);
                block.parent = this.node;

                let blockComponent: Block = block.getComponent(Block);
                blockComponent.init(new Vec2(i, j), new Vec3(i * cellWidth, (field[i].length + j) * cellHeight, 0));
                blockComponent.onBlockPress(onBlockPress)
                blockComponent.chooseRandomColor();
                blockComponent.updatePosition(new Vec3(i * cellWidth, j * cellHeight, 0));
                field[i][j] = blockComponent;
            }
        }
    }

    public rearrangeField(field: IBlock[][]) {
        let cellWidth: number = this.uiTransform.width / field.length;
        for (let i = 0; i < field.length; i++) {
            let cellHeight: number = this.uiTransform.height / field[i].length;

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
                    rearrange.setIndex(new Vec2(i, j));
                    rearrange.updatePosition(new Vec3(i * cellWidth, j * cellHeight, 0));
                    break;
                }
            }
        }
    }
}

