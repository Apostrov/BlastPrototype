import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoseScreen')
export class LoseScreen extends Component {
    start() {
        this.node.active = false;
    }

    public Show() {
        this.node.active = true;
    }
}

