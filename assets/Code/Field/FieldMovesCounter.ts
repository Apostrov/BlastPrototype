import { _decorator, Component, Node } from 'cc';
import { GameConfig } from '../Game';
import { MovesCounterUI } from '../UI/MovesCounterUI';
import { UIStateManager } from '../UI/UIStateManager';
const { ccclass, property } = _decorator;

@ccclass('FieldMovesCounter')
export class FieldMovesCounter extends Component {
    @property({ type: UIStateManager })
    public uiStateManager: UIStateManager | null = null;
    @property({ type: MovesCounterUI })
    public counterUI: MovesCounterUI | null = null;

    private config: GameConfig | null = null;
    private numberOfMoves: number = 0;

    public init(config: GameConfig) {
        this.config = config;
        this.numberOfMoves = 0;
        this.counterUI.updateCounter(config.numberOfMoves);
    }

    public updateMovesNumber() {
        this.numberOfMoves++;
        this.counterUI.updateCounter(this.config.numberOfMoves - this.numberOfMoves);

        if(this.numberOfMoves >= this.config.numberOfMoves) {
            this.uiStateManager.onLose();
        }
    }
}

