import { _decorator, Component, Node, Game } from 'cc';
import { IBlock } from '../Block/IBlock';
import { GameConfig } from '../Game';
import { PointsCounterUI } from '../UI/PointsCounterUI';
import { UIStateManager } from '../UI/UIStateManager';
const { ccclass, property } = _decorator;

@ccclass('FieldPointsCounter')
export class FieldPointsCounter extends Component {
    @property({ type: UIStateManager })
    public uiStateManager: UIStateManager | null = null;
    @property({ type: PointsCounterUI })
    public counterUI: PointsCounterUI | null = null;

    private config: GameConfig | null = null;
    private numberOfPoints: number = 0;

    public init(config: GameConfig) {
        this.config = config;
        this.numberOfPoints = 0;
        this.counterUI.updateCounter(this.numberOfPoints, this.config.numberOfPoints);
    }

    public tryToCountPoints(block: IBlock) {
        this.numberOfPoints++;
        this.counterUI.updateCounter(this.numberOfPoints, this.config.numberOfPoints);

        if (this.numberOfPoints >= this.config.numberOfPoints) {
            this.uiStateManager.onWin();
        }
    }
}

