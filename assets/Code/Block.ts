import { _decorator, Component, Node, Enum, random } from 'cc';
const { ccclass, property } = _decorator;

enum BlockColor{
    BLUE = 0,
    GREEN = 1,
    PINK = 2,
    YELLOW = 3
};

@ccclass('BlockVisual')
export class BlockVisual {
    @property({type:Enum(BlockColor)})
    id : BlockColor = BlockColor.BLUE;
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
    public block : BlockVisual[] = [];

    private currentColor : BlockColor = BlockColor.BLUE;

    public chooseRandomColor() {
        this.currentColor = randomEnumValue(BlockColor);
        this.block.forEach(element => {
            element.Visual.active = element.id == this.currentColor;
        });
    }
}

