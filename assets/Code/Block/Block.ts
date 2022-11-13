import { _decorator, Component, Node, Enum, Input, Vec2, Vec3, tween, Tween } from 'cc';
import { Field } from '../Field/Field';
import { BlocksPool } from './BlocksPool';
import { IBlock } from './IBlock';
const { ccclass, property } = _decorator;

export enum BlockColor {
    BLUE = 0,
    GREEN,
    PINK,
    YELLOW,
    SUPERBLOCK
};

@ccclass('BlockVisual')
export class BlockVisual {
    @property({ type: Enum(BlockColor) })
    id: BlockColor = BlockColor.BLUE;
    @property(Node)
    Visual: Node | null = null;
}

export const randomBlockColor = () => {
    const values = Object.keys(BlockColor);
    values.length -= 1; // remove SUPERBLOCk
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return BlockColor[enumKey];
}

@ccclass('Block')
export class Block extends Component implements IBlock {
    @property
    public moveAnimTime: number = 0.2;
    @property
    public destroyAnimTime: number = 0.1;
    @property([BlockVisual])
    public block: BlockVisual[] = [];

    private index: Vec2 = new Vec2(0, 0);
    private color: BlockColor = BlockColor.BLUE;
    private currentTween: Tween<Node> | null = null;

    public init(index: Vec2, spawnPos: Vec3) {
        this.index = index;
        this.node.position = spawnPos;
    }

    public onBlockPress(callback: (block: IBlock) => void) {
        this.node.on(Input.EventType.TOUCH_START, () => callback(this), this);
    }

    public chooseRandomColor() {
        this.chooseColor(randomBlockColor());
    }

    private chooseColor(color: BlockColor) {
        this.color = color;
        this.block.forEach(element => {
            element.Visual.active = element.id == this.color;
        });
    }

    public getIndex(): Vec2 {
        return this.index;
    }

    public getColor(): BlockColor {
        return this.color;
    }

    public setIndex(index: Vec2) {
        this.index = index;
    }

    public setColor(color: BlockColor) {
        this.chooseColor(color);
    }

    public updatePosition(pos: Vec3) {
        this.currentTween?.stop();
        this.currentTween = tween(this.node)
            .delay(this.destroyAnimTime)
            .to(this.moveAnimTime, { position: pos })
            .start();

    }

    public destroyBlock() {
        tween(this.node)
            .to(this.destroyAnimTime, { scale: new Vec3(0, 0, 0) }, {
                onComplete(target: Node) {
                    BlocksPool.destroyBlock(target);
                },
            })
            .start();
    }

    public cantDestroyBlock()
    {
        tween(this.node)
            .to(this.destroyAnimTime, { scale: new Vec3(0.5, 0.5, 0.5) })
            .to(this.destroyAnimTime, { scale: new Vec3(1, 1, 1) })
            .start();
    }
}

