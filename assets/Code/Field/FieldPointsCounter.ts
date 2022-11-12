import { _decorator, Component, Node, Game } from 'cc';
import { Block } from '../Block/Block';
import { GameConfig } from '../Game';
import { UIStateManager } from '../UI/UIStateManager';
const { ccclass, property } = _decorator;

@ccclass('FieldPointsCounter')
export class FieldPointsCounter extends Component {
    @property({ type: UIStateManager })
    public uiStateManager: UIStateManager | null = null;
    
    private config: GameConfig | null = null;
    private numberOfPoints: number = 0;

    public init(config: GameConfig) {
        this.config = config;
        this.numberOfPoints = 0;
    }

    public tryToCountPoints(block: Block) {
        if(block.getColor() == this.config.blockColor) {
            this.numberOfPoints++;
        }

        if (this.numberOfPoints >= this.config.numberOfPoints) {
            this.uiStateManager.onWin();
        }
    }
}

