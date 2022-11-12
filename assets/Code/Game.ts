import { _decorator, Component, Vec2, randomRange } from 'cc';
import { BlockColor, randomEnumValue } from './Block/Block';
import { Field } from './Field/Field';
import { UIStateManager } from './UI/UIStateManager';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    @property
    public minBlastGroup: number = 2;
    @property
    public maxFieldRefresh: number = 3;
    @property({ type: Vec2 })
    public gridSize: Vec2 = new Vec2(9, 10);
    @property({ type: Vec2 })
    public rangeNumberOfMoves: Vec2 = new Vec2(5, 15);
    @property({ type: Vec2 })
    public rangeNumberOfPoints: Vec2 = new Vec2(20, 50);

    @property({ type: Field })
    public field: Field | null = null;
    @property({ type: UIStateManager })
    public uiStateManager: UIStateManager | null = null;

    public start() {
        let config = new GameConfig;
        config.minBlastGroup = this.minBlastGroup;
        config.maxFieldRefresh = this.maxFieldRefresh;
        config.gridSize = this.gridSize;

        config.numberOfMoves = randomRange(this.rangeNumberOfMoves.x, this.rangeNumberOfMoves.y + 1);
        config.numberOfPoints = randomRange(this.rangeNumberOfPoints.x, this.rangeNumberOfPoints.y + 1);
        config.blockColor = randomEnumValue(BlockColor);

        this.field.init(config);
        this.uiStateManager.onGameplay();
    }
}

export class GameConfig {
    public minBlastGroup: number;
    public maxFieldRefresh: number;
    public gridSize: Vec2;
    public numberOfMoves: number;
    public numberOfPoints: number;
    public blockColor: BlockColor;
}
