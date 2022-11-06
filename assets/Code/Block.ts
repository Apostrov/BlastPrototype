import { _decorator, Component, Node, Enum, Input } from 'cc';
import { Field } from './Field/Field';
const { ccclass, property } = _decorator;

enum BlockColor {
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
    @property([BlockVisual])
    public block: BlockVisual[] = [];

    private currentColor: BlockColor = BlockColor.BLUE;
    private field: Field | null = null;

    public init(field: Field) {
        this.field = field;
    }

    public chooseRandomColor() {
        this.chooseColor(randomEnumValue(BlockColor));
    }

    public onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this.onBlockPress, this);
    }

    private chooseColor(color : BlockColor) {
        this.currentColor = color;
        this.block.forEach(element => {
            element.Visual.active = element.id == this.currentColor;
        });
    }

    private onBlockPress() {
        this.field?.blockPressed(this);
    }
}

