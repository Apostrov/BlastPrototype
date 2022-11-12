import { _decorator, Component, Node } from 'cc';
import { UIScreen } from './UIScreen';
const { ccclass, property } = _decorator;

@ccclass('UIStateManager')
export class UIStateManager extends Component {
    @property({ type: UIScreen })
    public gameplay: UIScreen | null = null;
    @property({ type: UIScreen })
    public winScreen: UIScreen | null = null;
    @property({ type: UIScreen })
    public loseScreen: UIScreen | null = null;

    private isGameEnded: boolean = false;

    public onGameplay() {
        this.isGameEnded = false;
        this.gameplay.show();
        this.winScreen.hide();
        this.loseScreen.hide();
    }

    public onWin() {
        if (this.isGameEnded)
            return;

        this.isGameEnded = true;
        this.gameplay.hide();
        this.winScreen.show();
    }

    public onLose() {
        if (this.isGameEnded)
            return;

        this.isGameEnded = true;
        this.gameplay.hide();
        this.loseScreen.show();
    }
}

