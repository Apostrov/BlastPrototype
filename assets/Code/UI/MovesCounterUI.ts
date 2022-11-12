import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovesCounterUI')
export class MovesCounterUI extends Component {
    @property({ type: RichText })
    public counterText: RichText | null = null;

    private counter: number = -999;

    public updateCounter(value: number) {
        if(this.counter == value)
            return;
        
        this.counter = value;
        this.counterText.string = value.toString();
    }
}

