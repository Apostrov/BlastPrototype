import { _decorator, Component, Node, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PointsCounterUI')
export class PointsCounterUI extends Component {
    @property
    public counterPrefix: string = "Points:<br/>";
    @property
    public targetPrefix: string = "<br/>Target:<br/>";
    @property
    public pointsMultiplier: number = 5;

    @property({ type: RichText })
    public counterText: RichText | null = null;

    private points: number = -999;

    public updateCounter(value: number, goal: number) {
        if (this.points == value)
            return;

        this.points = value;
        this.counterText.string = this.counterPrefix + Math.trunc(value * this.pointsMultiplier)
            + this.targetPrefix + Math.trunc(goal * this.pointsMultiplier);
    }
}

