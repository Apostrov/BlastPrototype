import { _decorator, Component, Node, Enum, Input, Vec2, Vec3, tween, Tween } from 'cc';
import { Field } from '../Field/Field';
const { ccclass, property } = _decorator;

export enum BlockColor {
    BLUE = 0,
    GREEN = 1,
    PINK = 2,
    YELLOW = 3
};

@ccclass('BlockVisual')
export class BlockVisual {
    @property({ type: Enum(BlockColor) })
    id: BlockColor = BlockColor.BLUE;
    @property(Node)
    Visual: Node | null = null;
}

const randomEnumValue = (enumeration) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}

@ccclass('Block')
export class Block extends Component {
    @property
    public moveAnimTime: number = 0.2;
    @property
    public destroyAnimTime: number = 0.1;
    @property([BlockVisual])
    public block: BlockVisual[] = [];

    private index: Vec2 = new Vec2(0, 0);
    private color: BlockColor = BlockColor.BLUE;
    private fieldComponent: Field | null = null;
    private currentTween: Tween<Node> | null = null;

    public init(index: Vec2, fieldComponent: Field, spawnPos: Vec3) {
        this.index = index;
        this.fieldComponent = fieldComponent;
        this.node.position = spawnPos;
    }

    public onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this.onBlockPress, this);
    }

    private onBlockPress() {
        this.fieldComponent?.blockPressed(this);
    }

    public chooseRandomColor() {
        this.chooseColor(randomEnumValue(BlockColor));
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

    public updateIndex(index: Vec2) {
        this.index = index;
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
                    target.destroy();
                },
            })
            .start();
    }
}

